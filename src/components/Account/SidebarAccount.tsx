import React from "react";
import Button from "../common/Button";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import LogOutButton from "./LogOutButton";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  user: User | null;
}

const SidebarAccount = ({ user }: Props) => {
  if (!user) {
    redirect("/login");
  }

  function getInitials(name: string | null | undefined): string {
    if (!name) return "User"; // Trả về chuỗi rỗng nếu name là null hoặc undefined

    const words = name.trim().split(" ");

    // Nếu chỉ có một từ, lấy hai ký tự đầu tiên
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    // Nếu có nhiều từ, lấy ký tự đầu tiên của hai từ cuối cùng
    return words
      .slice(-2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  return (
    <>
      {/* Top */}
      <div className="flex items-center gap-4">
        <div className="flex rounded-full bg-black p-6">
          <span className="m-auto font-bold text-white lg:size-14 lg:text-xl">
            {getInitials(user.name)}
          </span>
        </div>

        <div className="flex flex-col lg:gap-2">
          <div className="flex justify-between">
            <span className="text-lg font-bold uppercase">
              {user?.username}
            </span>
            {user.role === "ADMIN" && (
              <div className="flex">
                <ShieldCheck color="blue" size={24} />
                <Link
                  className="cursor-pointer text-blue-500 underline"
                  href={"/dashboard"}
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
          <span>{user?.email}</span>
          <LogOutButton />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8 py-8">
        <div className="flex flex-col gap-2 bg-gray-100 p-4">
          <span className="font-bold uppercase">Address Book</span>
          <span className="font-bold underline">View address book(0)</span>
        </div>

        <div className="flex flex-col gap-2 bg-gray-100 p-4">
          <span className="font-bold uppercase">Return</span>
          <Button className="" isPrimary>
            Return an item
          </Button>
        </div>

        <div className="flex flex-col gap-2 bg-gray-100 p-4">
          <span className="font-bold uppercase">Refer a friend</span>
          <Button className="" isPrimary>
            Visit your dashboard
          </Button>
        </div>
      </div>

      {/* Bottom */}
      <div></div>
    </>
  );
};

export default SidebarAccount;
