"use client";
import { Heart, Menu, Search, SearchIcon, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchDialog from "./SearchDialog";
import { linkProduct } from "@/constants/fakeData";

const Navbar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sidebarMoblie, setSideBarMobile] = useState(false);

    return (
        <div className="flex justify-between items-center px-6 py-6 border-b">
            {/* Left */}
            <div className="flex items-center">
                {/* Logo */}
                <Link href={"/"}>
                    <Image
                        src="https://cdn.gymshark.com/images/branding/gs-icon-black.svg"
                        alt="logo"
                        width={44}
                        height={36}
                        className="w-11 h-9 object-cover hidden lg:block"
                    />
                </Link>
                <div className="flex gap-4 lg:hidden">
                    <Menu />
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
                        className="w-11 h-9 object-cover lg:hidden"
                    />
                </Link>
                <div className="hidden lg:flex items-center gap-6 text-md font-bold ">
                    {linkProduct.map((link) => (
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
                <div className="hidden lg:flex gap-4">
                    <SearchIcon
                        className="cursor-pointer"
                        onClick={() => setIsDialogOpen(true)}
                    />
                    <Heart />
                </div>
                <User />
                <ShoppingCart />
            </div>
            {isDialogOpen && <SearchDialog setIsDialogOpen={setIsDialogOpen} />}
        </div>
    );
};

export default Navbar;
