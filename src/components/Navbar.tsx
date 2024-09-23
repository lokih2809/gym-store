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
import { PRODUCT_CATEGORIES } from "@/constants/fakeData";
import Cart from "./Cart";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between border-b px-4 py-6 md:px-6 lg:px-8 xl:px-12">
        {/* Left */}
        <div className="flex flex-grow basis-0 items-center">
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
        <div className="flex flex-grow basis-0 justify-center">
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
          <div className="hidden items-center gap-6 text-sm font-bold lg:flex">
            {PRODUCT_CATEGORIES.map((link) => (
              <Link
                key={link.name}
                href={`/${
                  process.env.NEXT_PUBLIC_COLLECTIONS
                }/${link.name.replace("'s", "")}`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-grow basis-0 items-center justify-end gap-4">
          <div className="hidden items-center gap-4 lg:flex">
            <SearchIcon
              className="hidden cursor-pointer lg:block"
              onClick={() => setIsDialogOpen(true)}
            />
            <Heart />
          </div>
          <Link href={"/login"}>
            <User />
          </Link>
          <ShoppingCart onClick={() => setIsCartOpen(true)} />
        </div>
        {isDialogOpen && <SearchDialog setIsDialogOpen={setIsDialogOpen} />}
        {isSidebarOpen && (
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
        {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
      </div>
    </>
  );
};

export default Navbar;
