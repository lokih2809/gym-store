"use client";

import React, { useRef, useState } from "react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductInfo } from "@/interfaces/common";

interface Props {
  type: "posts" | "products";
  posts?: TrendingPost[];
  listProducts?: ProductInfo[];
  categories?: string[];
  title: string;
}

const TrendingItemsSection = ({
  type,
  posts,
  listProducts,
  categories = [],
  title,
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
      <div className="relative w-screen space-y-4 py-12 pl-4 md:pl-8 lg:pl-12">
        {/* Top */}
        <h1 className="text-xl font-bold lg:text-2xl xl:text-3xl">
          {title.toUpperCase()}
        </h1>

        {/* Content */}
        <div className="flex items-center justify-between">
          <div className="scrollbar-hide flex gap-2 overflow-x-scroll">
            {/* Categories filter */}
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`mb-2 rounded-full px-4 py-1 font-semibold shadow-md lg:px-6 ${activeCategory === category ? "bg-black text-slate-100" : "bg-slate-100 text-black"}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          {/* Button */}
          <div className="mr-8 hidden gap-4 lg:flex">
            <button
              onClick={scrollLeft}
              className="rounded-full border bg-gray-100 p-2 shadow-lg"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={scrollRight}
              className="rounded-full bg-black p-2 text-gray-100 shadow-lg"
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
              <>
                <div key={item.name} className="">
                  <div className="relative h-[50vh] w-[80vw] md:h-[30vh] md:w-[23vw] lg:h-[60vh]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="mt-4 text-base font-bold uppercase lg:text-xl">
                      {item.name}
                    </h3>
                    <p className="my-4 w-[80%]">{item.desc}</p>
                    <Link href={"/"} className="font-bold underline">
                      {item.more || "Xem thêm"}
                    </Link>
                  </div>
                </div>
              </>
            ))}

          {/* Product */}
          {type === "products" &&
            listProducts?.map((product) => (
              <>
                <div key={product.name} className="">
                  {/* Image product */}
                  <div className="relative h-[50vh] w-[80vw] md:h-[30vh] md:w-[23vw] lg:h-[60vh]">
                    <Image
                      src={product.colors[0].images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Desc product */}
                  <div className="flex flex-col py-2 text-sm">
                    <span>{product.name}</span>
                    <span>
                      {product.colors.map((color, index) => (
                        <span key={color.colorName} className="text-gray-500">
                          {color.colorName}{" "}
                          {index < product.colors.length - 1 && "/ "}
                        </span>
                      ))}
                    </span>
                    <b className="">US$ {product.price}</b>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default TrendingItemsSection;
