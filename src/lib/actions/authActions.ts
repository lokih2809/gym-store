"use server";

import { z } from "zod";
import db from "../client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import bcrypt from "bcrypt";
import { getSession, signIn } from "next-auth/react";
import { ADMIN_MAIL } from "@/constants/common";

// Create user
const createUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().optional(),
  address: z.string().nullable().optional(),
  role: z.enum(["CUSTOMER", "ADMIN"]).optional(),
});

export const createUser = async (formData: FormData) => {
  const { email, password, name, phoneNumber, address, role } =
    createUserSchema.parse(formData);

  try {
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return {
        status: "error",
        message: "Email đã tồn tại, vui lòng nhập email khác.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address: address || null,
        phoneNumber: phoneNumber || null,
        role: role ? role : "CUSTOMER",
      },
    });

    return {
      status: "success",
      message: "Tạo tài khoản thành công.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Có lỗi xảy ra! vui lòng thử lại sau.",
    };
  }
};

// Refresh session
const refreshSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

// Delete user
export const deleteUser = async (id: number) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found or has already been deleted.");
    }

    if (existingUser.email !== ADMIN_MAIL) {
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
    return { status: "error", message: "Xóa tài khoản thất bại." };
  }
};

// Admin update user
export const adminUpdateUser = async (id: number, formData: FormData) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return { status: "error", message: "Không tìm thấy người dùng." };
    }

    const email = formData.get("email");

    if (typeof email === "string" && email !== existingUser.email) {
      const existingEmail = await db.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return {
          status: "error",
          message: "Email đã tồn tại, vui lòng nhập email khác.",
        };
      }
    }

    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (key === "address" && value === "") {
        data[key] = null;
      } else {
        data[key] = value;
      }
    });

    const updatedUser = await db.user.update({
      where: { id },
      data,
    });

    const session = await getSession();
    if (session) {
      const updatedSessionUser = { ...session.user, ...updatedUser };
      await signIn("credentials", { user: updatedSessionUser });
    }

    return {
      status: "success",
      message: "Cập nhật người dùng thành công.",
      user: updatedUser,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Cập nhật người dùng thất bại",
      status: "error",
    };
  }
};
