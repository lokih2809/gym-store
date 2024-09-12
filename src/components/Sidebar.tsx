import { Heart, Sun, X } from "lucide-react";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import {
  LINK_PRODUCT,
  MORE_OPTIONS,
  RECOMMENDATIONS,
} from "@/constants/fakeData";
import Image from "next/image";

type Props = {
  setIsSidebarOpen: (value: boolean) => void;
  setIsDialogOpen: (value: boolean) => void;
};

const Sidebar = ({ setIsSidebarOpen, setIsDialogOpen }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "women's",
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-auto w-full flex-col gap-4 bg-white">
      {/* Top */}
      <div className="fixed z-20 flex w-full flex-col gap-4 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Heart />
            <Sun />
          </div>
          <X
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <span className="text-xl font-bold">SHOP</span>
        <SearchBox
          disable
          onClick={() => {
            setIsDialogOpen(true);
            console.log(setIsDialogOpen);
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        {/* Category */}
        <div className="mt-36 flex items-center justify-center gap-4">
          {LINK_PRODUCT.map((item) => (
            <span
              className={`cursor-pointer py-4 font-bold uppercase ${activeCategory === item.name ? "border-b-2 border-black text-black" : "text-gray-400"}`}
              key={item.name}
              onClick={() => handleCategoryClick(item.name)}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* Image */}
        <div className="scrollbar-hide flex overflow-x-scroll">
          {LINK_PRODUCT.filter((item) => item.name === activeCategory).map(
            (item) => (
              <div
                key={item.name}
                className={`flex gap-2 ${item.images.length <= 1 ? "m-auto" : ""}`}
              >
                {item.images.map((image) => (
                  <div key={image} className={`relative h-56 w-[85vw]`}>
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="rounded-lg object-cover"
                    />
                    <span className="absolute bottom-2 left-4 text-sm font-bold text-white">
                      NEW RELEASES
                    </span>
                  </div>
                ))}
              </div>
            ),
          )}
        </div>

        {/* Recommendations */}
        <div className="flex cursor-pointer flex-col uppercase">
          {RECOMMENDATIONS.map((item, index) => (
            <div key={item.name} className="">
              <span className="cursor-pointer font-bold">{item.name}</span>
              {RECOMMENDATIONS.length - 1 > index && <hr className="my-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-1 flex-col gap-4 bg-gray-100 p-4">
        <span className="font-bold">MORE</span>
        {MORE_OPTIONS.map((item) => (
          <span
            className="ml-2 cursor-pointer text-sm font-semibold capitalize text-gray-500"
            key={item.name}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
