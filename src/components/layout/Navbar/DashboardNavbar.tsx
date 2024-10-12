"use client";

import { Bell, Earth, MessageSquareText } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between border-b p-8">
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
