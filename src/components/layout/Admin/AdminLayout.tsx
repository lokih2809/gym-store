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
        <div className="flex flex-1 flex-col">
          <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
          <div className="overflow-auto bg-second p-4 xl:p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
