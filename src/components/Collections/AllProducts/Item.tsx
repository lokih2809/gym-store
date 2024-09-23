import { ProductInfo } from "@/interfaces/common";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  productInfo: ProductInfo;
}

const Item = ({ productInfo }: Props) => {
  return (
    <>
      <Link
        href={`/${process.env.NEXT_PUBLIC_PRODUCT}/${productInfo.id}`}
        className="flex flex-col gap-2"
      >
        {/* Image */}
        <div className="relative h-[25vh] w-full md:h-[30vh] lg:h-[50vh]">
          <Image
            src={productInfo.colors[0].images[0]}
            alt=""
            fill
            className="object-fit"
          />
          <div className="absolute left-2 top-2 z-10 rounded-full bg-white p-1">
            <ShoppingBag size={20} />
          </div>
          <div className="absolute right-2 top-2 z-10 rounded-full bg-white p-1">
            <Heart size={20} />
          </div>
        </div>

        {/* Info */}
        <div className="px-2 text-sm">
          <span>{productInfo.name}</span>
          <div className="flex items-center gap-1 text-gray-500">
            {productInfo.colors.map((color, index) => (
              <span key={color.colorName}>
                {color.colorName} {index < productInfo.colors.length - 1 && "/"}
              </span>
            ))}
          </div>

          <b className="text-red-500">US$ {productInfo.price}</b>
        </div>
      </Link>
    </>
  );
};

export default Item;
