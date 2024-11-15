import React, { useState } from "react";
import Button from "../common/Button";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import LogOutButton from "./LogOutButton";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import ActionUser from "./ActionUser";

interface Props {
  user: User | null;
}

const SidebarAccount = ({ user }: Props) => {
  if (!user) {
    redirect("/login");
  }

  function getInitials(name: string | null | undefined): string {
    if (!name) return "User";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return words
      .slice(-2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  const [userAction, setUserAction] = useState<
    "updateInfo" | "changePassword" | null
  >(null);

  return (
    <>
      <div className="flex flex-col">
        {/* Top */}
        <div className="flex items-center gap-4">
          <div className="flex rounded-full bg-black p-4">
            <span className="m-auto font-bold text-white lg:text-xl">
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
            <div className="font-bold underline">
              <LogOutButton />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 py-8">
          <div className="flex flex-col gap-4 bg-gray-100 p-4">
            <span className="font-bold uppercase">Edit Your Account</span>
            <span
              className="cursor-pointer font-bold underline"
              onClick={() => setUserAction("updateInfo")}
            >
              Edit Info
            </span>
            <span
              className="cursor-pointer font-bold underline"
              onClick={() => setUserAction("changePassword")}
            >
              Change Password
            </span>
          </div>

          <div className="flex flex-col gap-2 bg-gray-100 p-4">
            <span className="font-bold uppercase">Return</span>
            <Button className="" isPrimary>
              Return an item
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div></div>
        {userAction && (
          <ActionUser
            user={user}
            userAction={userAction}
            setUserAction={setUserAction}
          />
        )}
      </div>
    </>
  );
};

export default SidebarAccount;
