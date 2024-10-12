import OrderHistory from "@/components/Account/OrderHistory";
import SidebarAccount from "@/components/Account/SidebarAccount";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
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
          <SidebarAccount user={session?.user} />
          <OrderHistory />
          {/* Main */}
        </div>
      </div>
    </>
  );
};

export default Account;
