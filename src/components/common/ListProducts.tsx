"use client";

import { ProductInfo } from "@/interfaces/common";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useState } from "react";

type Props = {
  forHomepage?: boolean;
  listProducts?: ProductInfo[];
};

const ListProducts = ({ forHomepage, listProducts }: Props) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!listProducts) return notFound();

  return (
    <>
      {listProducts?.map((product, index) => (
        <div key={product.name} className="">
          {/* Image product */}
          <div
            className={`${forHomepage ? "relative h-[50vh] w-[80vw] cursor-pointer md:h-[30vh] md:w-[23vw] lg:h-[60vh]" : "relative h-[25vh] w-full md:h-[30vh] lg:h-[50vh]"}`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <Image
              src={
                hoverIndex === index &&
                product.colors[0].images.length > 1 &&
                product.colors[0].images[0]
                  ? product.colors[0].images[1]
                  : product.colors[0].images[0]
              }
              alt={product.name}
              fill
              sizes="1000"
              className="object-cover"
            />
            <div className="absolute left-2 top-2 z-10 rounded-full bg-white p-1">
              <ShoppingBag size={20} />
            </div>
            <div className="absolute right-2 top-2 z-10 rounded-full bg-white p-1">
              <Heart size={20} />
            </div>
          </div>

          {/* Desc product */}
          <Link
            href={`${process.env.NEXT_PUBLIC_PRODUCT_LINK}/${product.id}`}
            className="flex flex-col py-2 text-sm"
          >
            <span className="font-bold">{product.name}</span>
            <span>
              {product.colors.map((color, index) => (
                <span key={color.colorName} className="text-gray-500">
                  {color.colorName} {index < product.colors.length - 1 && "/ "}
                </span>
              ))}
            </span>
            <b className="text-red-500">US$ {product.price}</b>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ListProducts;
