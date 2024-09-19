import OrderHistory from "@/components/Account/OrderHistory";
import SidebarAccount from "@/components/Account/SidebarAccount";
import React from "react";

const Account = () => {
  return (
    <>
      <div className="flex flex-col gap-4 px-12">
        {/* Top */}
        <span className="mx-auto py-6 text-3xl font-bold uppercase">
          Your gym account
        </span>

        {/* Content */}
        <div className="flex">
          {/* Sidebar */}
          <SidebarAccount />
          <OrderHistory />
          {/* Main */}
        </div>
      </div>
    </>
  );
};

export default Account;
