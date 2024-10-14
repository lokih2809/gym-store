import React from "react";
import SidebarAccount from "./SidebarAccount";
import OrderHistory from "./OrderHistory";
import { User } from "next-auth";

interface Props {
  user: User;
}

const Account = ({ user }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 px-8">
        {/* Top */}
        <span className="mx-auto py-6 text-3xl font-bold uppercase">
          Your gym account
        </span>

        {/* Content */}
        <div className="flex">
          {/* Sidebar */}
          <SidebarAccount user={user} />
          <OrderHistory />
          {/* Main */}
        </div>
      </div>
    </>
  );
};

export default Account;
