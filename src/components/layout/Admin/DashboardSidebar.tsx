import {
  ArrowLeft,
  BookMarked,
  CircleDollarSign,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import MenuLink from "../User/Sidebar/MenuLink";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <User />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <Package />,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <CircleDollarSign />,
  },
  {
    title: "Posts",
    path: "/dashboard/posts",
    icon: <BookMarked />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Help",
    path: "/dashboard/help",
    icon: <CircleHelp />,
  },
];

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-20 flex h-[100vh] w-1/2 flex-col gap-8 bg-primary text-[#A9A9A9] transition-transform duration-300 md:w-1/3 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:relative xl:w-2/12 xl:translate-x-0`}
      >
        {/* Top Section */}
        <div className="mx-6 flex flex-col gap-4 py-6 xl:mx-auto">
          <div className="flex items-center justify-between md:justify-start md:gap-8">
            <ArrowLeft
              onClick={() => setIsSidebarOpen(false)}
              className="xl:hidden"
            />
            <Link href={"/"} className="relative h-6 w-28 xl:h-10 xl:w-52">
              <Image
                fill
                src={"/Gymshark_logo.svg"}
                alt=""
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Content */}
        <ul className="pl-8">
          {menuItems.map((item) => (
            <MenuLink key={item.title} item={item} />
          ))}
          {/* Logout Button */}
          <li
            className="flex cursor-pointer items-center gap-6 px-4 py-4 text-sm font-bold"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            <LogOut />
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardSidebar;
