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
    <div className="scrollbar-hidden overflow-x-scroll whitespace-nowrap">
      {color.images.map((image) => (
        <div key={image} className="relative inline-block h-[60vh] w-[100vw]">
          <Image src={image} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ImagesInfo;
