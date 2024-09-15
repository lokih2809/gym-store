"use client";

import React, { useRef, useState } from "react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TrendingPost = {
  name: string;
  desc: string;
  image: string;
  tag: string;
  more?: string;
};

type Props = {
  data: TrendingPost[];
  categories: string[];
  title: string;
};

const TrendingItemsSection = ({ data, categories, title }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const filteredData = data.filter((item) => item.tag === activeCategory);

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
    <div className="relative w-screen space-y-4 py-12 pl-4 md:pl-8 lg:pl-12">
      {/* Top */}
      <h1 className="text-xl font-bold lg:text-2xl xl:text-3xl">
        {title.toUpperCase()}
      </h1>

      {/* Content */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-2 py-1 font-semibold shadow-md lg:px-4 lg:py-2 ${activeCategory === category ? "bg-black text-slate-100" : "bg-slate-100 text-black"}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="mr-8 hidden gap-4 lg:flex">
          <button
            onClick={scrollLeft}
            className="rounded-full bg-gray-100 p-2 shadow-lg"
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
        {filteredData.map((item) => (
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
                <p className="my-4 w-[80%] lg:font-semibold">{item.desc}</p>
                <Link href={"/"} className="font-bold underline">
                  {item.more || "Xem thêm"}
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TrendingItemsSection;
