"use client";

import { PRODUCT_SIZES } from "@/constants/data";
import { ProductInfo } from "@/types/common";
import { ProductSize } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState, useEffect } from "react";

interface SelectOptionsProps {
  onColorChange: (color: string | null) => void;
  onSizeChange: (size: string | null) => void;
  productInfo: ProductInfo;
}

const SelectOptions = ({
  onColorChange,
  onSizeChange,
  productInfo,
}: SelectOptionsProps) => {
  const availableSizes = new Set(
    productInfo.productSizes.map((size: ProductSize) => size.size),
  );
  const [selectSize, setSelectSize] = useState<string | null>(null);
  const [selectColor, setSelectColor] = useState<string | null>(
    productInfo?.colors[0]?.colorName,
  );

  useEffect(() => {
    onColorChange(selectColor);
  }, [selectColor]);
  useEffect(() => {
    onSizeChange(selectSize);
  }, [selectSize]);

  if (
    !productInfo.colors.length ||
    !productInfo.colors.some((color) => color.images.length > 0)
  ) {
    return notFound();
  }

  return (
    <>
      {/* Color */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-4">
          {productInfo.colors.map((color) => (
            <div
              key={color.id}
              className={`border-2 ${selectColor === color.colorName ? "border-black" : "border-white"}`}
            >
              <Image
                src={color.images[0]}
                alt={color.colorName}
                width={64}
                height={80}
                className="h-20 w-16 cursor-pointer object-cover"
                onClick={() => setSelectColor(color.colorName)}
              />
            </div>
          ))}
        </div>
        <span className="font-bold">{selectColor}</span>
      </div>

      {/* Size */}
      <div>
        <span className="text-xs">Select a size</span>
        <div className="flex gap-4 overflow-x-scroll border p-4">
          {PRODUCT_SIZES.map((size) => (
            <span
              key={size}
              className={`px-4 py-2 font-bold ${availableSizes.has(size) ? (size === selectSize ? "bg-black text-white" : "cursor-pointer") : "line-through"}`}
              onClick={() => setSelectSize(size)}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectOptions;
