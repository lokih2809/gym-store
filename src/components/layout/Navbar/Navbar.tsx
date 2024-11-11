"use client";
import { Heart, Menu, Search, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { PRODUCT_CATEGORIES } from "@/constants/data";
import UserOptions from "./UserOptions";
import { LOGO_1 } from "@/constants/common";
import Cart from "./Cart/Cart";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between border-b px-4 py-6 md:px-6 lg:px-8 xl:px-12">
        {/* Left */}
        <div className="flex flex-grow basis-0 items-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={44}
              height={36}
              className="hidden h-9 w-11 object-cover lg:block"
            />
          </Link>
          <div className="flex gap-4 lg:hidden">
            <Menu
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Search
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
        </div>

        {/* Mid */}
        <div className="flex flex-grow basis-0 justify-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src={LOGO_1}
              alt="logo"
              width={44}
              height={36}
              className="h-9 w-11 object-cover lg:hidden"
            />
          </Link>
          <div className="hidden items-center gap-6 text-sm font-bold lg:flex">
            {PRODUCT_CATEGORIES.map((item) => (
              <Link key={item.name} href={item.link}>
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-grow basis-0 items-center justify-end gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <div className="cursor-pointer p-2 hover:rounded-full hover:bg-gray-100">
              <SearchIcon
                className="hidden cursor-pointer lg:block"
                onClick={() => setIsDialogOpen(true)}
              />
            </div>
            <div className="cursor-pointer p-2 hover:rounded-full hover:bg-gray-100">
              <Heart />
            </div>
          </div>
          <UserOptions />
          <Cart />
        </div>
        {isDialogOpen && <SearchDialog setIsDialogOpen={setIsDialogOpen} />}
        {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}
      </div>
    </>
  );
};

export default Navbar;
