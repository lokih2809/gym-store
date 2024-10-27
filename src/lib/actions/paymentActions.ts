"use server";

import { PaymentMethod } from "@prisma/client";
import db from "../client";

interface FormData {
  userId?: number;
  totalPrice: number;
  addressOrder: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  products: {
    id: number;
    quantity: number;
  }[];
}

// Function to create an order
export const createOrder = async (formData: FormData) => {
  const userId =
    typeof formData.userId === "string"
      ? parseInt(formData.userId, 10)
      : formData.userId;

  const productIds = formData.products.map((product) => product.id);
  const products = await db.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  if (products.length !== formData.products.length) {
    throw new Error("Some products do not exist.");
  }

  const existingTransactionId = await db.order.findUnique({
    where: {
      transactionId: formData.transactionId,
    },
  });

  if (existingTransactionId)
    return { status: "Error", message: "Đơn hàng đã được tạo." };

  try {
    const order = await db.order.create({
      data: {
        userId: userId || 1,
        addressOrder: formData.addressOrder,
        phoneNumber: formData.phoneNumber,
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === "VNPAY" ? "PAID" : "PENDING",
        status: "PENDING",
        totalPrice: formData.totalPrice,
        transactionId: formData.transactionId,
        orderItems: {
          create: formData.products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });

    return { status: "Success", message: "Tạo đơn hàng thành công!", order };
  } catch (error) {
    console.log(error);
    return {
      status: "Error",
      message: "Có lỗi xảy ra vui lòng liên hệ với chúng tôi.",
    };
  }
};
