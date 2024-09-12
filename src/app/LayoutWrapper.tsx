import Navbar from "@/components/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <div className="relative w-full">
        {/* Navbar */}
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
