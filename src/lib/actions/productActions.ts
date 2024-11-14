"use server";

import { Category } from "@prisma/client";
import db from "../client";
import { ProductInfo } from "@/types/common";

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

interface FormDataProduct {
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

export const createProduct = async (formData: FormDataProduct) => {
  const { name, price, sku, category, fit, description, color, sizes, images } =
    formData;

  const existingSku = await db.product.findUnique({ where: { sku } });
  if (existingSku) {
    return {
      status: "error",
      message: "SKU đã tồn tại. Vui lòng sử dụng SKU khác!",
    };
  }

  const priceAsNumber = parseFloat(price);
  if (isNaN(priceAsNumber)) {
    return {
      status: "error",
      message: "Giá không hợp lệ!",
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
      message: "Thêm sản phẩm mới thành công!",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      status: "error",
      message: "Có lỗi xảy ra trong quá trình thêm sản phẩm!",
    };
  }
};

export const deleteColorProduct = async (id: number) => {
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

    return { message: "Xóa màu sản phẩm thành công." };
  } catch (error) {
    console.error("Error deleting Color:", error);
    throw new Error("Failed to delete Color");
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    const productInOrderItems = await db.orderItem.findMany({
      where: { productId: id },
    });

    if (productInOrderItems.length > 0) {
      await db.product.update({
        where: { id },
        data: { deleted: true },
      });
      return { message: "Product soft-deleted successfully." };
    } else {
      await db.product.delete({
        where: { id },
      });

      await db.productColor.deleteMany({
        where: { productId: id },
      });
      await db.productSize.deleteMany({
        where: { productId: id },
      });

      return { message: "Product and related data deleted successfully." };
    }
  } catch (error) {
    console.error("Error deleting Product:", error);
    throw new Error("Failed to delete Product");
  }
};

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
      return { message: "Product not found.", status: "error" };
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
      message: "Product updated successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to update product",
    };
  }
};

export const addProductColor = async (
  productId: number,
  color: { colorName: string; images: string[] },
) => {
  const { colorName, images } = color;

  try {
    // Check if the product exists
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
      include: { colors: true },
    });
    if (!existingProduct) {
      return { status: "error", message: "Product not found." };
    }

    // Check if the color already exists
    const existingColor = existingProduct.colors.find(
      (color) => color.colorName === colorName,
    );
    if (existingColor) {
      return { status: "error", message: "Color already exists." };
    }

    // Create the new color
    const newColor = await db.productColor.create({
      data: {
        colorName,
        images,
        productId,
      },
    });

    return {
      status: "success",
      message: "Color added successfully!",
      newColor,
    };
  } catch (error) {
    console.error("Error adding color:", error);
    return {
      status: "error",
      message: "An error occurred while adding color.",
      error,
    };
  }
};

export const deleteColor = async (colorId: number) => {
  try {
    const response = await db.productColor.delete({
      where: {
        id: colorId,
      },
    });
    return { status: "success", message: "Color deleted.", response };
  } catch (error) {
    return { status: "error", message: "Something went wrong!" };
  }
};

export const updateColor = async (
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
    return { status: "success", message: "Update complete." };
  } catch (error) {
    return { status: "error", message: "Update fail." };
  }
};

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
      message:
        "Order item deleted, and product deleted if it had no remaining order items and was marked as deleted.",
    };
  } catch (error) {
    console.error("Error deleting OrderItem and checking Product:", error);
    throw new Error("Failed to delete OrderItem and/or Product");
  }
};
