"use server";

import { Category, Prisma } from "@prisma/client";
import db from "../client";
import { ProductInfo } from "@/types/common";

// Update images to cloud
export const apiUpdateImages = async (images: FormData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: images,
      },
    );

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error(
        `Upload failed: ${response.statusText}, Details: ${errorResponse}`,
      );
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Create new product
interface ProductFormData {
  name: string;
  price: string;
  sku: string;
  color: string;
  fit: string;
  sizes?: string[];
  description: string;
  category: Category;
  images: string[];
}

export const createProduct = async (formData: ProductFormData) => {
  const { name, price, sku, category, fit, description, color, sizes, images } =
    formData;

  const existingSku = await db.product.findUnique({ where: { sku } });
  if (existingSku) {
    return {
      status: "error",
      message: "SKU đã tồn tại, Vui lòng sử dụng SKU khác.",
    };
  }

  const priceAsNumber = parseFloat(price);
  if (isNaN(priceAsNumber)) {
    return {
      status: "error",
      message: "Giá không hợp lệ, vui lòng nhập lại.",
    };
  }

  try {
    const response = await db.product.create({
      data: {
        name,
        price: priceAsNumber,
        sku,
        category,
        fit,
        description,
        colors: {
          create: {
            colorName: color,
            images,
          },
        },
        productSizes: {
          create: sizes
            ? sizes.map((size: string) => ({
                size,
              }))
            : [],
        },
      },
    });

    return {
      response,
      status: "success",
      message: "Thêm sản phẩm mới thành công.",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      status: "error",
      message: "Có lỗi xảy ra trong quá trình thêm sản phẩm.",
    };
  }
};

// Delete product
export const deleteProduct = async (id: number) => {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    // Kiểm tra sản phẩm có trong orderItem không
    const productInOrderItems = await db.orderItem.findMany({
      where: { productId: id },
    });

    if (productInOrderItems.length > 0) {
      await db.product.update({
        where: { id },
        data: { deleted: true },
      });
      return {
        status: "success",
        message: "Xóa sản phẩm tạm thời thành công.",
      };
    }

    // Xóa sản phẩm và dữ liệu liên quan trong một transaction
    await db.$transaction(async (tx) => {
      await tx.productColor.deleteMany({
        where: { productId: id },
      });

      await tx.productSize.deleteMany({
        where: { productId: id },
      });

      await tx.product.delete({
        where: { id },
      });
    });

    return { status: "success", message: "Xóa sản phẩm thành công." };
  } catch (error) {
    console.error("Error deleting product:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: "error",
        message: `Có lỗi xảy ra khi xóa sản phẩm: ${error.message}`,
      };
    }

    return {
      status: "error",
      message: "Xóa sản phẩm thất bại, có lỗi xảy ra.",
    };
  }
};

// Delete color
export const deleteProductColor = async (id: number) => {
  try {
    const existingColor = await db.productColor.findUnique({
      where: { id },
    });

    if (!existingColor) {
      throw new Error("Color not found or has already been deleted.");
    }

    await db.productColor.delete({
      where: { id },
    });

    return { status: "success", message: "Xóa màu thành công." };
  } catch (error) {
    console.error("Error deleting Color:", error);
    return { status: "success", message: "Xóa màu thất bại, có lỗi xảy ra." };
  }
};

// Search product
export const searchProducts = async (query: string): Promise<ProductInfo[]> => {
  if (!query || typeof query !== "string") {
    throw new Error("Invalid query");
  }
  try {
    const result = await db.product.findMany({
      take: 4,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        colors: true,
        productSizes: true,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

// update Product
export const updateProduct = async (
  productId: number,
  productData: {
    name: string;
    price: string;
    sku: string;
    category: Category;
    fit: string;
    description: string;
    sizes?: string[];
  },
) => {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return {
        status: "error",
        message: "Không tìm thấy sản phẩm, hãy thử lại sau.",
      };
    }

    await db.product.update({
      where: { id: productId },
      data: {
        name: productData.name,
        price: parseFloat(productData.price),
        sku: productData.sku,
        category: productData.category,
        fit: productData.fit,
        description: productData.description,
      },
    });

    const existingSizes = await db.productSize.findMany({
      where: { productId: productId },
    });

    await Promise.all(
      existingSizes
        .filter(
          (size) =>
            !productData.sizes || !productData.sizes.includes(size.size),
        )
        .map((size) =>
          db.productSize.delete({
            where: { id: size.id },
          }),
        ),
    );

    await Promise.all(
      productData.sizes?.map(async (size) => {
        const existingSize = existingSizes.find((s) => s.size === size);
        if (!existingSize) {
          await db.productSize.create({
            data: {
              productId,
              size,
            },
          });
        }
      }) || [],
    );

    return {
      status: "success",
      message: "Cập nhật sản phẩm thành công.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Cập nhật sản phẩm thất bại, có lỗi xảy ra",
    };
  }
};

// Add product color
export const addProductColor = async (
  productId: number,
  color: { colorName: string; images: string[] },
) => {
  const { colorName, images } = color;

  try {
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
      include: { colors: true },
    });
    if (!existingProduct) {
      return {
        status: "error",
        message: "Không tìm thấy sản phẩm, vui lòng thử lại sau.",
      };
    }

    const existingColor = existingProduct.colors.find(
      (color) => color.colorName === colorName,
    );
    if (existingColor) {
      return {
        status: "error",
        message: "Màu đã tồn tại, vui lòng thêm màu khác.",
      };
    }

    const newColor = await db.productColor.create({
      data: {
        colorName,
        images,
        productId,
      },
    });

    return {
      status: "success",
      message: "Thêm màu thành công.",
      newColor,
    };
  } catch (error) {
    console.error("Error adding color:", error);
    return {
      status: "error",
      message: "Thêm màu thất bại.",
    };
  }
};

// Update product color
export const updateProductColor = async (
  colorId: number,
  color: { colorName: string; images: string[] },
) => {
  const { colorName, images } = color;
  try {
    await db.productColor.update({
      where: {
        id: colorId,
      },
      data: {
        images,
      },
    });
    return {
      status: "success",
      message: "Cập nhật màu thành công.",
      colorName,
    };
  } catch (error) {
    return { status: "error", message: "Cập nhật thất bại, hãy thử lại sau." };
  }
};

// Delete order Item and check Product
export const deleteOrderItemAndCheckProduct = async (
  orderItemId: number,
  productId: number,
) => {
  try {
    await db.orderItem.delete({
      where: { id: orderItemId },
    });

    const remainingOrderItems = await db.orderItem.findMany({
      where: { productId },
    });

    if (remainingOrderItems.length === 0) {
      const product = await db.product.findUnique({
        where: { id: productId },
      });

      if (product?.deleted) {
        await db.product.delete({
          where: { id: productId },
        });
      }
    }

    return {
      status: "success",
      message: "Xóa sản phẩm thành công.",
    };
  } catch (error) {
    console.error("Error deleting OrderItem and checking Product:", error);
    throw new Error("Failed to delete OrderItem and/or Product");
  }
};
