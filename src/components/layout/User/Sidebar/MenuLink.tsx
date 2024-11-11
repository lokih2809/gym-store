"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  item: {
    path: string;
    icon: ReactNode;
    title: string;
  };
}

const MenuLink = ({ item }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={item.path}
        className={`flex cursor-pointer items-center gap-6 px-4 py-4 font-bold ${pathname === item.path ? "text-highlight" : ""}`}
      >
        {item.icon}
        {item.title}
      </Link>
    </>
  );
};

export default MenuLink;
