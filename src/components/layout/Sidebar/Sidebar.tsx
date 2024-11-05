import { Heart, Sun, X } from "lucide-react";
import React, { useState } from "react";
import {
  PRODUCT_CATEGORIES,
  ADDITIONAL_OPTIONS,
  RECOMMENDED_CATEGORIES,
} from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COLLECTIONS_LINK } from "@/constants/common";

type Props = {
  setIsSidebarOpen: (value: boolean) => void;
};

const Sidebar = ({ setIsSidebarOpen }: Props) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    "women's",
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handlePageChange = (name: string) => {
    setIsSidebarOpen(false);
    router.push(`${COLLECTIONS_LINK}/${name.replace("'s", "")}`);
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
        <div className="mt-10 space-y-4 p-4">
          {/* Category */}
          <div className="flex items-center justify-center gap-4">
            {PRODUCT_CATEGORIES.map((item) => (
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
            {PRODUCT_CATEGORIES.filter(
              (item) => item.name === activeCategory,
            ).map((item) => (
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
                      onClick={() => handlePageChange(item.name)}
                    />
                    <span className="absolute bottom-2 left-4 text-sm font-bold text-white">
                      NEW RELEASES
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="flex cursor-pointer flex-col uppercase">
            {RECOMMENDED_CATEGORIES.map((item, index) => (
              <div key={item} className="">
                <span className="cursor-pointer font-bold">{item}</span>
                {RECOMMENDED_CATEGORIES.length - 1 > index && (
                  <hr className="my-6" />
                )}
              </div>
            ))}
          </div>
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
