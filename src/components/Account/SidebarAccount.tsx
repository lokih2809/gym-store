import React from "react";
import Button from "../common/Button";

const SidebarAccount = () => {
  return (
    <>
      <div>
        {/* Top */}
        <div className="flex w-[15vw] gap-4">
          <div className="h-16 rounded-full bg-black p-4 text-xl font-bold text-white">
            <span>NM</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold uppercase">Nhựt Minh</span>
            <span>nhutminh.dev@gmail.com</span>
            <span className="font-bold underline">Log out</span>
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
            <Button className="">Return an item</Button>
          </div>

          <div className="flex flex-col gap-2 bg-gray-100 p-4">
            <span className="font-bold uppercase">Refer a friend</span>
            <Button className="">Visit your dashboard</Button>
          </div>
        </div>

        {/* Bottom */}
        <div></div>
      </div>
    </>
  );
};

export default SidebarAccount;
