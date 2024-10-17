"use client";

import React, { useRef, useState } from "react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Post, ProductInfo } from "@/utils/types/common";
import ListProducts from "../common/ListProducts";

interface Props {
  type: "posts" | "products";
  posts?: Post[];
  productsRandom?: ProductInfo[];
  categories?: string[];
  title: string;
  listFor?: string;
}

const TrendingItemsSection = ({
  type,
  posts,
  productsRandom,
  categories = [],
  title,
  listFor,
}: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories?.length > 0 ? categories[0] : "",
  );

  const filteredData = posts?.filter((item) => item?.tag === activeCategory);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative w-screen space-y-4 py-8 pl-4 md:pl-8 lg:pl-12">
        {/* Top */}
        <span className="text-2xl font-bold uppercase text-gray-500">
          {listFor}
        </span>
        {posts && (
          <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
            {title.toUpperCase()}
          </h1>
        )}

        {/* Content */}
        <div className="flex items-center justify-between">
          {posts ? (
            <div className="scrollbar-hide flex gap-2 overflow-x-scroll">
              {/* Categories filter */}
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`mb-2 rounded-full px-4 py-2 font-semibold shadow-md lg:px-6 ${activeCategory === category ? "bg-black text-slate-100" : "bg-slate-100 text-black"}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          ) : (
            <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
              {title.toUpperCase()}
            </h1>
          )}
          {/* Button */}
          <div className="mr-8 hidden gap-4 lg:flex">
            <button
              onClick={scrollLeft}
              className="rounded-full border bg-gray-100 p-1 shadow-lg"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={scrollRight}
              className="rounded-full bg-black p-1 text-gray-100 shadow-lg"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-scroll"
        >
          {/* Post */}
          {type === "posts" &&
            filteredData?.map((item) => (
              <div key={item.name}>
                <div className="relative h-[50vh] w-[80vw] md:h-[30vh] md:w-[23vw] lg:h-[60vh]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="1000"
                    className="object-cover"
                  />
                </div>
                <div className="w-[80vw] md:w-[23vw]">
                  <h3 className="mt-4 text-base font-bold uppercase lg:text-xl">
                    {item.name}
                  </h3>
                  <p className="my-4 w-[80%]">{item.desc}</p>
                  <Link href={"/"} className="font-bold underline">
                    {item.more || "Xem thêm"}
                  </Link>
                </div>
              </div>
            ))}

          {/* Product */}
          {type === "products" && (
            <ListProducts listProducts={productsRandom} forHomepage />
          )}
        </div>
      </div>
    </>
  );
};

export default TrendingItemsSection;
