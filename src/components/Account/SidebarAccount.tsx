import React from "react";
import Button from "../common/Button";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import LogOutButton from "./LogOutButton";
import { ShieldCheck, User as UserIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  user?: User;
}

const SidebarAccount = ({ user }: Props) => {
  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <div>
        {/* Top */}
        <div className="flex w-[15vw] gap-4">
          <div className="h-16 rounded-full border p-4 text-xl font-bold text-white">
            <span>
              <UserIcon color="black" />
            </span>
          </div>

          <div className="flex flex-col gap-2">
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
      </div>
    </>
  );
};

export default SidebarAccount;
