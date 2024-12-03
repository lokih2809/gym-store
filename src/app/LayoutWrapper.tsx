"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    if (pathName.startsWith("/dashboard") && user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [pathName, user, router]);

  if (pathName.startsWith("/dashboard") && user?.role === "ADMIN") {
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
