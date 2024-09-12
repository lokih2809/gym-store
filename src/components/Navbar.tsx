"use client";
import {
  Heart,
  Menu,
  Search,
  SearchIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchDialog from "./SearchDialog";
import Sidebar from "./Sidebar";
import SearchBox from "./SearchBox";
import { LINK_PRODUCT } from "@/constants/fakeData";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b px-6 py-6">
      {/* Left */}
      <div className="flex items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src="https://cdn.gymshark.com/images/branding/gs-icon-black.svg"
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
      <div className="flex">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src="https://cdn.gymshark.com/images/branding/gs-icon-black.svg"
            alt="logo"
            width={44}
            height={36}
            className="h-9 w-11 object-cover lg:hidden"
          />
        </Link>
        <div className="text-md hidden items-center gap-6 font-bold lg:flex">
          {LINK_PRODUCT.map((link) => (
            <Link
              key={link.name}
              href={`/${
                process.env.NEXT_PUBLIC_PRODUCT
              }/${link.name.replace("'s", "")}`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-4 lg:flex">
          <div>
            <SearchBox className="hidden xl:flex" disable />
            <SearchIcon
              className="hidden cursor-pointer lg:block xl:hidden"
              onClick={() => setIsDialogOpen(true)}
            />
          </div>

          <Heart />
        </div>
        <User />
        <ShoppingCart />
      </div>
      {isDialogOpen && <SearchDialog setIsDialogOpen={setIsDialogOpen} />}
      {isSidebarOpen && (
        <Sidebar
          setIsSidebarOpen={setIsSidebarOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default Navbar;
