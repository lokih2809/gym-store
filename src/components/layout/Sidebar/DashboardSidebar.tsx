import {
  BriefcaseBusiness,
  ChartLine,
  CircleDollarSign,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import React from "react";
import MenuLink from "./MenuLink";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { LOGO_2 } from "@/constants/common";
import Link from "next/link";

const menuItems = [
  {
    title: "Pages",
    list: [
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
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <BriefcaseBusiness />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <ChartLine />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <Users />,
      },
    ],
  },
  {
    title: "User",
    list: [
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
    ],
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
          className="fixed inset-0 z-10 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-20 h-full w-1/2 bg-white px-4 transition-transform duration-300 lg:px-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:w-2/12 lg:translate-x-0`}
      >
        {/* Top Section */}
        <div className="flex flex-col gap-4 py-6">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="relative h-6 w-32 lg:h-8 lg:w-40">
              <Image fill src={LOGO_2} alt="" className="object-contain" />
            </Link>
            <X onClick={() => setIsSidebarOpen(false)} className="lg:hidden" />
          </div>
          <span className="px-2 text-blue-500 underline">Administrator</span>
        </div>

        {/* Content */}
        <ul>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className="text-sm font-bold">{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink key={item.title} item={item} />
              ))}
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div
          className="flex cursor-pointer items-center gap-4 px-4 py-4 text-sm font-bold hover:bg-gray-200"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <LogOut />
          Logout
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
