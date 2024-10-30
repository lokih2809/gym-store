"use client";

import { RootState } from "@/app/redux/store";
import Account from "@/components/Account";
import { findOrders } from "@/lib/actions/OrderActions";
import { OrderWithProduct } from "@/types/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AccountContainer = () => {
  const user = useSelector((state: RootState) => state.session.user);
  const [listOrders, setListOrders] = useState<OrderWithProduct[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const result = await findOrders({ userId: user.id.toString() });
        if (result && result.status === "success") {
          setListOrders(result.listOrders);
        }
      }
    };
    fetchOrders();
  }, [user]);

  return <Account user={user} listOrders={listOrders} />;
};

export default AccountContainer;
