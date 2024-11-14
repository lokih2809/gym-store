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
      <div className="flex h-[100vh] bg-second">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1">
          <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
          <div className="bg-second">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
