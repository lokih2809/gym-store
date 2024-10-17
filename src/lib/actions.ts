"use server";

import db from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Category } from "@prisma/client";
import { z } from "zod";

// User actions
const refreshSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const deleteUser = async (id: number) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found or has already been deleted.");
    }

    if (existingUser.email !== process.env.NEXT_PUBLIC_MAIL_ADMIN) {
      await db.user.delete({
        where: { id },
      });

      await refreshSession();
      return { status: "success", message: "Xóa người dùng thành công." };
    } else {
      return { status: "error", message: "Không thể xóa tài khoản này." };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

export const updateUser = async (id: number, formData: FormData) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (existingUser.email !== process.env.NEXT_PUBLIC_MAIL_ADMIN) {
      const updatedUser = await db.user.update({
        where: { id },
        data,
      });

      await refreshSession();
      return { message: "User updated successfully.", user: updatedUser };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Product actions
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

const FormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  sku: z.string().min(8, "SKU must have at least 8 characters"),
  category: z.nativeEnum(Category),
  fit: z.string(),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
});
interface FormDataProduct {
  name: string;
  price: number;
  sku: string;
  color: string;
  fit?: string;
  sizes: string[];
  description: string;
  category: Category;
  images: string[];
}

export const createProduct = async (formData: FormDataProduct) => {
  const result = FormSchema.safeParse(formData);

  if (!result.success) {
    return {
      status: "error",
      message: "Dữ liệu không hợp lệ!",
      errors: result.error.format(),
    };
  }

  const { name, price, sku, category, fit, description, color, sizes, images } =
    result.data;

  try {
    const response = await db.product.create({
      data: {
        name,
        price,
        sku,
        category,
        fit,
        description,
        colors: {
          create: {
            colorName: color,
            colorHex: "#FFFFFF",
            images,
          },
        },
        productSizes: {
          create: sizes.map((size: string) => ({
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
