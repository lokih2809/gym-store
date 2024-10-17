"use client";

import Footer from "@/components/layout/Footer";
import Notification from "@/components/layout/Notification";
import Navbar from "@/components/layout/Navbar/Navbar";
import React from "react";
import { redirect, usePathname } from "next/navigation";
import DashboardSidebar from "@/components/layout/Sidebar/DashboardSidebar";
import DashboardNavbar from "@/components/layout/Navbar/DashboardNavbar";
import { useSession } from "next-auth/react";
import RightBar from "@/components/Dashboard/RightBar";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathName = usePathname();
  const { data: session } = useSession();

  if (pathName.startsWith("/dashboard")) {
    if (!session || session?.user.role !== "ADMIN") redirect("/");
    return (
      <>
        <div className="flex gap-4 px-4">
          <DashboardSidebar />
          <div className="flex-1 space-y-4">
            <DashboardNavbar />
            <div className="flex gap-4">
              <div className="flex-1">{children}</div>
              <RightBar />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (pathName === "/login") {
    return (
      <>
        <div className="relative w-full">{children}</div>
      </>
    );
  }

  return (
    <>
      <div className="flex min-h-screen">
        <div className="relative w-full">
          <Notification isMobile />
          <Navbar />
          <Notification />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LayoutWrapper;
