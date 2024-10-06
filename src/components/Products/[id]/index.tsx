"use client";

import { ProductInfo } from "@/interfaces/common";
import React, { useState } from "react";
import ImagesInfo from "./ImagesInfo";
import ProductInformation from "./ProductInformation";
import SelectOptions from "./SelectOptions";
import ButtonAdd from "./ButtonAdd";
import Description from "./Description";

const ProductDetail = ({ productInfo }: { productInfo: ProductInfo }) => {
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
        <ImagesInfo selectedColor={selectedColor} productInfo={productInfo} />
        <div className="mx-auto">
          <ProductInformation productInfo={productInfo} />

          <div className="mt-4 flex flex-col gap-6 px-4">
            <SelectOptions
              onColorChange={handleColorChange}
              onSizeChange={handleSizeChange}
              productInfo={productInfo}
            />
            <ButtonAdd />
            <Description productInfo={productInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
