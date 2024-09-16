"use client";

import { PRODUCT_DATA } from "@/constants/fakeData";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const allSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

interface SelectOptionsProps {
  onColorChange: (color: string | null) => void;
  onSizeChange: (size: string | null) => void;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
  onColorChange,
  onSizeChange,
}) => {
  const availableSizes = new Set(PRODUCT_DATA.sizes.map((size) => size.size));
  const [selectSize, setSelectSize] = useState<string | null>(null);
  const [selectColor, setSelectColor] = useState<string | null>(
    PRODUCT_DATA.colors[0].colorName || null,
  );

  // Call the provided functions whenever selectColor or selectSize changes
  useEffect(() => {
    onColorChange(selectColor);
  }, [selectColor]);
  useEffect(() => {
    onSizeChange(selectSize);
  }, [selectSize]);

  return (
    <>
      {/* Color */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-4">
          {PRODUCT_DATA.colors.map((color) => (
            <div key={color.id}>
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
        <span>{selectColor}</span>
      </div>

      {/* Size */}
      <div>
        <span className="text-xs">Select a size</span>
        <div className="flex gap-4 overflow-x-scroll border p-4">
          {allSizes.map((size) => (
            <span
              key={size}
              className={`px-4 py-2 font-bold ${availableSizes.has(size) ? (size === selectSize ? "bg-black text-white" : "") : "line-through"}`}
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
