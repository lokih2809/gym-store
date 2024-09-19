"use client";

import ButtonAdd from "@/components/Products/ProductName/ButtonAdd";
import Description from "@/components/Products/ProductName/Description";
import ImagesInfo from "@/components/Products/ProductName/ImagesInfo";
import ProductInformation from "@/components/Products/ProductName/ProductInformation";
import SelectOptions from "@/components/Products/ProductName/SelectOptions";
import React, { useState } from "react";

const ProductName = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const handleColorChange = (color: string | null) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string | null) => {
    setSelectedSize(size);
  };

  return (
    <>
      <div className="xl:flex xl:justify-between">
        <ImagesInfo selectedColor={selectedColor} />
        <div className="mx-auto">
          <ProductInformation />

          <div className="mt-4 flex flex-col gap-6 px-4">
            <SelectOptions
              onColorChange={handleColorChange}
              onSizeChange={handleSizeChange}
            />
            <ButtonAdd />
            <Description />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductName;
