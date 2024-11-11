"use client";

import React from "react";
import { redirect, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AdminLayout from "@/components/layout/Admin/AdminLayout";
import CheckoutLayout from "@/components/layout/CheckoutLayout";
import UserLayout from "@/components/layout/User/UserLayout";

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const pathName = usePathname();
  const user = useSelector((state: RootState) => state.session.user);

  if (pathName.startsWith("/dashboard")) {
    if (user?.role !== "ADMIN") redirect("/");
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (pathName === "/login") {
    return <div className="relative w-full">{children}</div>;
  }

  if (pathName.startsWith("/checkout")) {
    return <CheckoutLayout>{children}</CheckoutLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
};

export default LayoutWrapper;
