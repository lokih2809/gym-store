"use client";

import React, { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-second flex h-full">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1">
          <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
          <div className="bg-second h-auto">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
