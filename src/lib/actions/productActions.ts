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

  const existingSku = await db.product.findUnique({
    where: { sku },
  });
  console.log("Checking SKU:", sku, "Exists:", existingSku);

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
        fit: fit,
        description,
        colors: {
          create: {
            colorName: color,
            images,
          },
        },
        productSizes: {
          create:
            sizes &&
            sizes.map((size: string) => ({
              size,
            })),
        },
      },
    });

    return {
      response,
      status: "success",
      message: "Thêm sản phẩm mới thành công!",
    };
  } catch (error) {
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
      throw new Error(
        `Product with ID ${id} not found or has already been deleted.`,
      );
    }

    await db.productColor.deleteMany({
      where: { productId: id },
    });

    await db.productSize.deleteMany({
      where: { productId: id },
    });

    await db.product.delete({
      where: { id },
    });

    return { message: "Xóa sản phẩm thành công." };
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
  colorId: number,
  productData: {
    name: string;
    price: string;
    sku: string;
    category: Category;
    fit: string;
    description: string;
    sizes: string[];
  },
  updatedColorData: { colorName: string; images: string[] },
) => {
  console.log("Updating Product ID:", productId);
  console.log("Updating Color ID:", colorId);
  try {
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return { message: "Product not found.", status: "error" };
    }

    const existingColor = await db.productColor.findUnique({
      where: { id: colorId },
    });

    if (!existingColor) {
      return { message: "Color not found.", status: "error" };
    }

    await db.productColor.update({
      where: { id: colorId },
      data: {
        colorName: updatedColorData.colorName,
        images: updatedColorData.images,
      },
    });

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
        .filter((size) => !productData.sizes.includes(size.size))
        .map((size) =>
          db.productSize.delete({
            where: { id: size.id },
          }),
        ),
    );

    await Promise.all(
      productData.sizes.map(async (size) => {
        const existingSize = existingSizes.find((s) => s.size === size);
        if (!existingSize) {
          await db.productSize.create({
            data: {
              productId,
              size,
            },
          });
        }
      }),
    );

    return {
      message: "Product updated successfully.",
      status: "success",
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      message: "Failed to update product",
      status: "error",
    };
  }
};

export const addProductColor = async (
  productId: number,
  colorName: string,
  formData: FormData,
) => {
  try {
    const existingProduct = await db.product.findUnique({
      where: { id: productId },
      include: { colors: true },
    });

    if (!existingProduct) {
      return { status: "error", message: "Product not found." };
    }

    const existingColor = existingProduct.colors.find(
      (color) => color.colorName === colorName,
    );

    if (existingColor) {
      return { status: "error", message: "Color not found." };
    }

    const newColor = await db.productColor.create({
      data: {
        colorName,
        productId: productId,
      },
    });

    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: {
        colors: {
          connect: { id: newColor.id },
        },
      },
    });

    return { status: "success", message: "Add color complete!" };
  } catch (error) {
    return { status: "success", message: "Add color complete!" };
  }
};
