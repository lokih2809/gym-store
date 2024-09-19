"use client";

import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const pathName = usePathname();
  return (
    <>
      <div className="flex min-h-screen">
        {pathName !== "/login" ? (
          <div className="relative w-full">
            <Notification isMobile />
            <Navbar />
            <Notification />
            {children}
            <Footer />
          </div>
        ) : (
          <div className="relative w-full">{children}</div>
        )}
      </div>
    </>
  );
};

export default LayoutWrapper;
