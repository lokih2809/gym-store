"use client";

import React, { ReactNode, useState } from "react";
import DashboardSidebar from "./Sidebar/DashboardSidebar";
DashboardSidebar;
import DashboardNavbar from "./Navbar/DashboardNavbar";
import RightBar from "../Dashboard/RightBar";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  console.log(setIsSidebarOpen);

  return (
    <>
      <div className="flex gap-4 px-2">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 space-y-4">
          <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex gap-4">
            <div className="flex-1">{children}</div>
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
