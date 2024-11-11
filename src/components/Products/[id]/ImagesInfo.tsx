"use client";

import { ProductInfo } from "@/types/common";
import Image from "next/image";
import React from "react";

interface Props {
  selectedColor: string | null;
  productInfo: ProductInfo;
}

const ImagesInfo = ({ selectedColor, productInfo }: Props) => {
  const color =
    productInfo?.colors.find((c) => c.colorName === selectedColor) ||
    productInfo?.colors[0];

  const imageLayout = (index: number, images: string[], image: string) => {
    if (images.length === 1) {
      // 1 image
      return (
        <div key={index} className="relative inline-block h-full w-full">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw" // Hình ảnh chiếm toàn bộ chiều rộng
          />
        </div>
      );
    } else if (images.length % 2 === 0 && images.length % 3 !== 0) {
      // 2,4,8,10,... images
      return (
        <div
          key={index}
          className="relative inline-block h-[60vh] w-full flex-shrink-0 xl:h-[85vh] xl:w-[49%]"
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 49vw"
          />
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className={`relative inline-block h-full w-full xl:h-[80vh] ${
            (index + 1) % 3 === 0 ? "xl:w-[99%]" : "xl:w-[49%]"
          }`}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes={`(max-width: 1280px) 100vw, ${
              (index + 1) % 3 === 0 ? "99vw" : "49vw"
            }`} // Định nghĩa kích thước theo tỷ lệ cho từng trường hợp
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="scrollbar-hide flex h-[60vh] gap-2 overflow-x-scroll xl:h-[85vh] xl:w-1/2 xl:flex-wrap xl:overflow-x-visible xl:overflow-y-scroll">
        {color?.images?.map((image, index) =>
          imageLayout(index, color?.images, image),
        )}
      </div>
    </>
  );
};

export default ImagesInfo;
