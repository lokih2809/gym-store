import Orders from "@/components/Dashboard/Orders";
import db from "@/lib/client";
import React from "react";

const OrdersContainer = async () => {
  const listOrders = await db.order.findMany({
    include: {
      user: true,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Orders listOrders={listOrders} />;
};

export default OrdersContainer;
