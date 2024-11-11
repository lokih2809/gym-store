"use server";

import { OrderWithProduct } from "@/types/common";
import db from "../client";
import { PaymentMethod, Status } from "@prisma/client";

interface FindOrdersParams {
  userId: string;
  orderId?: number;
  transactionId?: string;
}

export const findOrders = async ({
  userId,
  orderId,
  transactionId,
}: FindOrdersParams) => {
  if (!userId && userId === null) {
    return { status: "Error", listOrders: [] };
  }

  try {
    const whereCondition: any = { userId: +userId };
    if (orderId) whereCondition.id = orderId;
    if (transactionId) whereCondition.transactionId = transactionId;

    const listOrders: OrderWithProduct[] = await db.order.findMany({
      where: whereCondition,
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return { status: "success", listOrders };
  } catch (error) {
    return { status: "error", listOrders: [] };
  }
};

interface CreateOrderFormData {
  userId?: string;
  totalPrice: number;
  name: string;
  addressOrder: string;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  products: {
    id: number;
    quantity: number;
    color?: string;
    size?: string;
  }[];
}

export const createOrder = async (formData: CreateOrderFormData) => {
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
        name: formData.name,
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
            color: product.color,
            size: product.size,
          })),
        },
      },
    });

    return {
      status: "success",
      message:
        "Tạo đơn hàng thành công, vui lòng ấn vào link bên dưới để xem chi tiết!",
      order,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Có lỗi xảy ra vui lòng liên hệ với chúng tôi.",
    };
  }
};

export const updateStatus = async (id: number, status: Status) => {
  try {
    const existingOrder = await db.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return { status: "error", message: "Order not found." };
    }

    const updateOrderStatus = await db.order.update({
      where: { id },
      data: {
        status,
      },
    });

    return {
      updateOrderStatus,
      status: "success",
      message: "Status updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Failed to update status",
    };
  }
};
