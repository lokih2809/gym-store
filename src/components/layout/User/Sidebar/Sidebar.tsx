import { Heart, Sun, X } from "lucide-react";
import React, { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const RECOMMENDED_CATEGORIES = [
  "popular",
  "products",
  "explore",
  "ACCESSORIES",
  "sale",
];

export const ADDITIONAL_OPTIONS = [
  "accessibility statement",
  "Help",
  "email sign up",
  "blog",
];

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar = ({ setIsSidebarOpen }: Props) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "women's",
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handlePageChange = (link: string) => {
    setIsSidebarOpen(false);
    router.push(link);
  };

  return (
    <>
      <div className="scrollbar-hide fixed inset-0 z-20 flex animate-slide-in-left flex-col gap-4 overflow-hidden overflow-y-scroll bg-white">
        {/* Top */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex gap-4">
            <Heart />
            <Sun />
          </div>
          <X
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <div className="flex items-center justify-center gap-6">
            {PRODUCT_CATEGORIES.map((item) => (
              <span
                className={`scrollbar-hide cursor-pointer gap-2 overflow-y-scroll py-4 text-sm font-bold uppercase ${activeCategory === item.name ? "border-b-2 border-black text-black" : "text-gray-400"}`}
                key={item.name}
                onClick={() => handleCategoryClick(item.name)}
              >
                {item.name}
              </span>
            ))}
          </div>

          {/* Image */}
          <div className="scrollbar-hide flex overflow-x-scroll px-4">
            {PRODUCT_CATEGORIES.filter(
              (item) => item.name === activeCategory,
            ).map((item) => (
              <div key={item.name} className={`m-auto flex gap-2`}>
                <div key={item.image} className={`relative h-56 w-[85vw]`}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="rounded-lg object-cover"
                    onClick={() => handlePageChange(item.link)}
                  />
                  <span className="absolute bottom-2 left-4 text-sm font-bold text-white">
                    NEW RELEASES
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex cursor-pointer flex-col px-4 uppercase">
          {RECOMMENDED_CATEGORIES.map((item, index) => (
            <div key={item} className="">
              <span className="cursor-pointer font-bold">{item}</span>
              {RECOMMENDED_CATEGORIES.length - 1 > index && (
                <hr className="my-6" />
              )}
            </div>
          ))}
        </div>

        {/* More */}
        <div className="flex flex-1 flex-col gap-4 bg-gray-100 p-4">
          <span className="font-bold">MORE</span>
          {ADDITIONAL_OPTIONS.map((item) => (
            <span
              className="ml-2 cursor-pointer text-sm font-semibold capitalize text-gray-500"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
