"use client";

import { useEffect, useState } from "react";
import { OrderWithProduct } from "@/types/common";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { findOrders } from "@/lib/actions/OrderActions";
import OrderDetail from "@/components/Orders";

interface Props {
  searchParams: {
    transactionId?: string;
    orderId?: string;
  };
}

const OrderDetailContainer = ({ searchParams }: Props) => {
  const [order, setOrder] = useState<OrderWithProduct | null>(null);
  const user = useSelector((state: RootState) => state.session.user);

  useEffect(() => {
    const fetchOrder = async () => {
      const { transactionId, orderId } = searchParams;

      const result = await findOrders({
        userId: user?.id ? String(user.id) : "",
        orderId: orderId ? Number(orderId) : undefined,
        transactionId: transactionId || undefined,
      });

      if (result.status === "success" && result.listOrders.length > 0) {
        setOrder(result.listOrders[0]);
      } else {
        setOrder(null);
      }
    };

    fetchOrder();
  }, [searchParams, user]);

  if (!order) return <p>Loading...</p>;

  return <OrderDetail order={order} />;
};

export default OrderDetailContainer;
