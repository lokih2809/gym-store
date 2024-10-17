import db from "@/lib/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  role: z.enum(["CUSTOMER", "ADMIN"]).optional(),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password, name, address, role } =
      userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email đã tồn tại, vui lòng nhập email khác" },
        { status: 409 },
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "Tài khoản đã tồn tại vui lòng nhập tài khoản khác",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
        address: address ? address : "",
        role: role ? role : "CUSTOMER",
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "user created success",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
