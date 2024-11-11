import React, { ReactNode } from "react";
import Notification from "./Navbar/Notification";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
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

export default UserLayout;
