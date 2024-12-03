"use client";

import React, { useRef, useState } from "react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ListProducts from "../common/ListProducts";
import { ProductInfo } from "@/types/common";
import { Post } from "@prisma/client";
import { extractFirstText } from "@/utils/utils";
import { POSTS_LINK } from "@/constants/common";

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

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 1000, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative w-full space-y-4 px-2 py-8 md:px-4 md:pl-8 lg:px-6 xl:px-8">
        {/* Top */}
        <span className="text-2xl font-bold uppercase text-gray-500">
          {listFor}
        </span>

        {/* Content */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold lg:text-xl xl:text-2xl">
            {title.toUpperCase()}
          </h1>
          {/* Button */}
          <div className="mr-8 hidden gap-4 md:flex">
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
            posts?.map((post) => (
              <div key={post.id}>
                <div className="relative h-[50vh] w-[80vw] md:h-[30vh] md:w-[23vw] lg:h-[60vh]">
                  <Image
                    src={post.thumbnail}
                    alt=""
                    fill
                    sizes="1000"
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="w-[80vw] md:w-[23vw]">
                  <h3 className="mt-4 text-base font-bold uppercase lg:text-xl">
                    {post.title}
                  </h3>
                  <p className="my-4 w-[80%]">
                    {extractFirstText(post.content, 100)}
                  </p>
                  <Link
                    href={`${POSTS_LINK}/${post.id}`}
                    className="font-bold underline"
                  >
                    {"Xem thêm"}
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
