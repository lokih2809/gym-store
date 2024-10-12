"use client";

import Footer from "@/components/layout/Footer";
import Notification from "@/components/layout/Notification";
import Navbar from "@/components/layout/Navbar/Navbar";
import React from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/layout/Sidebar/DashboardSidebar";
import DashboardNavbar from "@/components/layout/Navbar/DashboardNavbar";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathName = usePathname();

  if (pathName.startsWith("/dashboard")) {
    return (
      <>
        <div className="flex gap-4 px-4">
          <DashboardSidebar />
          <div className="flex-1">
            <DashboardNavbar />
            <span>Dashboard</span>
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
