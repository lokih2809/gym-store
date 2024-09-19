"use client";

import { PRODUCT_DATA } from "@/constants/fakeData";
import Image from "next/image";
import React from "react";

type Props = {
  selectedColor: string | null;
};

const ImagesInfo = ({ selectedColor }: Props) => {
  const color =
    PRODUCT_DATA.colors.find((c) => c.colorName === selectedColor) ||
    PRODUCT_DATA.colors[0];

  return (
    <>
      <div className="xl:scrollbar-hide overflow-x-scroll xl:flex xl:h-[90vh] xl:w-1/2 xl:flex-wrap xl:gap-2 xl:overflow-y-scroll">
        {color.images.map((image, index) => (
          <div
            key={index}
            className={`relative inline-block h-[60vh] w-[100vw] ${(index + 1) % 3 === 0 ? "xl:h-[100vh] xl:w-[99%]" : "xl:w-[49%]"}`}
          >
            <Image src={image} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImagesInfo;
