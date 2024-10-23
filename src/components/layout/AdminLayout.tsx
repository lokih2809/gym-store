import React, { ReactNode } from "react";
import DashboardSidebar from "./Sidebar/DashboardSidebar";
import DashboardNavbar from "./Navbar/DashboardNavbar";
import RightBar from "../Dashboard/RightBar";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
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
};

export default AdminLayout;
