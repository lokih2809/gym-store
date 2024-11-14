"use server";

import db from "../client";
import bcrypt from "bcrypt";

type EditFormValues = {
  email: string;
  username: string;
  name: string;
  phoneNumber: string;
  address?: string | null | undefined;
};

export const updateUserInfoAction = async (
  id: number,
  formData: EditFormValues,
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
    return { status: "success", message: "Update completed." };
  } catch (error) {
    return { status: "error", message: "Update Failed." };
  }
};

export const changePasswordAction = async (
  id: number,
  formData: { oldPassword: string; newPassword: string },
) => {
  const { oldPassword, newPassword } = formData;

  const userInfo = await db.user.findFirst({
    where: { id },
    select: { password: true },
  });

  if (!userInfo || !(await bcrypt.compare(oldPassword, userInfo.password))) {
    return { status: "error", message: "Old Password does not match." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { status: "success", message: "Password updated successfully." };
  } catch (error) {
    return { status: "error", message: "Password update failed." };
  }
};

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
        createdAt: true,

        updatedAt: true,
        role: true,
        address: true,
        phoneNumber: true,
      },
    });
    return { response };
  } catch (error) {
    console.log(error);
  }
};
