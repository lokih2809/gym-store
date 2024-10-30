"use server";

import { z } from "zod";
import db from "../client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import bcrypt from "bcrypt";
import { getSession, signIn } from "next-auth/react";
import { ADMIN_MAIL } from "@/constants/common";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
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
  const { email, username, password, name, phoneNumber, address, role } =
    userSchema.parse(formData);

  try {
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return {
        status: "error",
        message: "Email đã tồn tại, vui lòng nhập email khác",
      };
    }

    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return {
        status: "error",
        message: "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
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
    if (error instanceof z.ZodError) {
      console.log("Validation errors:", error.errors);
    } else {
      console.log("Other errors:", error);
    }
    return {
      status: "error",
      message: "Có lỗi xảy ra! vui lòng thử lại sau.",
    };
  }
};

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
    throw new Error("Failed to delete user");
  }
};

export const editUser = async (id: number, formData: FormData) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return { status: "error", message: "User not found." };
    }

    const email = formData.get("email");
    const username = formData.get("username");

    if (typeof email === "string" && email !== existingUser.email) {
      const existingEmail = await db.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return {
          status: "error",
          message: "Email already exists, please choose another.",
        };
      }
    }

    if (typeof username === "string" && username !== existingUser.username) {
      const existingUsername = await db.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return {
          status: "error",
          message: "Username already exists, please choose another.",
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
      message: "User updated successfully.",
      user: updatedUser,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to update user",
      status: "error",
    };
  }
};

export const findUserWithEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    return { user };
  } catch (error) {
    console.log(error);
  }
};
