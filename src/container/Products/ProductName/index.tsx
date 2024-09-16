"use client";

import ButtonAdd from "@/components/Products/ProductName/ButtonAdd";
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
      <ImagesInfo selectedColor={selectedColor} />
      <ProductInformation />
      <div className="mt-4 flex flex-col gap-4 px-4">
        <SelectOptions
          onColorChange={handleColorChange}
          onSizeChange={handleSizeChange}
        />
        <ButtonAdd />
      </div>
    </>
  );
};

export default ProductName;
