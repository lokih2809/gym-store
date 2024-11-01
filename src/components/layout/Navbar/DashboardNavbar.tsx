"use client";

import { Bell, Earth, Menu, MessageSquareText } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
}

const DashboardNavbar = ({ setIsSidebarOpen }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between border-b py-4 lg:p-6">
        <Menu onClick={() => setIsSidebarOpen(true)} className="lg:hidden" />
        <span className="font-bold capitalize">
          {pathname.split("/").pop()}
        </span>

        <div>
          {/* Searchbox */}

          <div className="flex gap-4">
            <MessageSquareText />
            <Bell />
            <Earth />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
