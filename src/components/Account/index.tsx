"use client";

import SidebarAccount from "./SidebarAccount";
import OrderHistory from "./OrderHistory";
import { User } from "next-auth";
import { OrderWithProduct } from "@/types/common";

interface Props {
  user: User | null;
  listOrders: OrderWithProduct[];
}

const Account = ({ user, listOrders }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        {/* Top */}
        <span className="py-6 text-lg font-bold uppercase lg:mx-auto lg:text-3xl">
          Your gym account
        </span>

        {/* Content */}
        <div className="flex flex-col lg:flex-row lg:gap-4">
          {/* Sidebar */}
          <SidebarAccount user={user} />
          <OrderHistory listOrders={listOrders} />
          {/* Main */}
        </div>
      </div>
    </>
  );
};

export default Account;
