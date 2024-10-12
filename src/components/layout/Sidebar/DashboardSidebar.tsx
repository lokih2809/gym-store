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
} from "lucide-react";
import React from "react";
import MenuLink from "./MenuLink";
import Image from "next/image";
import { signOut } from "next-auth/react";

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
        title: "Transactions",
        path: "/dashboard/transactions",
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

const DashboardSidebar = () => {
  return (
    <div className="w-2/12">
      {/* Top */}
      <div className="flex items-center gap-4 py-6">
        <Image
          src={"/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="size-10 object-cover"
        />
        <div className="flex flex-col">
          <b>Lok1</b>
          <span>Administrator</span>
        </div>
      </div>

      {/* Content */}
      <ul className="">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-sm font-bold">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
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
  );
};

export default DashboardSidebar;
