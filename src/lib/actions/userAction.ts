"use server";

import db from "../client";
import bcrypt from "bcrypt";

// Update user
type UpdateUserInfoData = {
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
  address?: string | null | undefined;
};

export const updateUserInfo = async (
  id: number,
  formData: UpdateUserInfoData,
) => {
  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        ...formData,
      },
    });
    return { status: "success", message: "Cập nhật thông tin thành công." };
  } catch (error) {
    return { status: "error", message: "Cập nhật thất bại." };
  }
};

// Change password
export const changePassword = async (
  id: number,
  formData: { oldPassword: string; newPassword: string },
) => {
  const { oldPassword, newPassword } = formData;

  const userInfo = await db.user.findFirst({
    where: { id },
    select: { password: true },
  });

  if (!userInfo || !(await bcrypt.compare(oldPassword, userInfo.password))) {
    return {
      status: "error",
      message: "Mật khẩu cũ không khớp, vui lòng thử lại.",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { status: "success", message: "Đổi mật khẩu thành công." };
  } catch (error) {
    return {
      status: "error",
      message: "Đổi mật khẩu thất bại, có lỗi xảy ra.",
    };
  }
};

// Get user data without password
export const fetchUserDataFromApi = async (id: number) => {
  try {
    const response = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        phoneNumber: true,
        address: true,
        role: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
