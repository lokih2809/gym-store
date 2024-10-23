"use client";

import Notification from "@/components/layout/Navbar/Notification";
import Navbar from "@/components/layout/Navbar/Navbar";
import React from "react";
import { redirect, usePathname } from "next/navigation";
import DashboardSidebar from "@/components/layout/Sidebar/DashboardSidebar";
import DashboardNavbar from "@/components/layout/Navbar/DashboardNavbar";
import { useSession } from "next-auth/react";
import RightBar from "@/components/Dashboard/RightBar";
import Footer from "@/components/layout/Footer/Footer";
import AdminLayout from "@/components/layout/AdminLayout";
import UserLayout from "@/components/layout/UserLayout";
import CheckoutLayout from "@/components/layout/CheckoutLayout";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathName = usePathname();
  const { data: session } = useSession();

  if (pathName.startsWith("/dashboard")) {
    if (session?.user.role !== "ADMIN") redirect("/");
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
