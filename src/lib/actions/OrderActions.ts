"use server";

import { OrderWithProduct } from "@/types/common";
import db from "../client";
import { Status } from "@prisma/client";

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
    console.log(error);
    return { status: "error", listOrders: [] };
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
