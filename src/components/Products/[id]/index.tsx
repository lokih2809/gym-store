"use client";

import React, { useState } from "react";
import ImagesInfo from "./ImagesInfo";
import ProductInformation from "./ProductInformation";
import SelectOptions from "./SelectOptions";
import ButtonAdd from "./ButtonAdd";
import Description from "./Description";
import { ProductInfo } from "@/types/common";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/slices/cartSlice";
import { notFound } from "next/navigation";

const ProductDetail = ({
  productInfo,
}: {
  productInfo: ProductInfo | null;
}) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Check if productInfo is null, and return notFound() if it is
  if (!productInfo) {
    return notFound();
  }

  const selectedColorImage =
    productInfo.colors.find((color) => color.colorName === selectedColor)
      ?.images[0] ||
    productInfo.colors[0]?.images[0] ||
    "/noCart.png";

  const handleColorChange = (color: string | null) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string | null) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        size: selectedSize,
        color: selectedColor || productInfo.colors[0].colorName,
        fit: productInfo.fit,
        image: selectedColorImage,
        quantity: 1,
      }),
    );
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
            <ButtonAdd onClick={handleAddToCart} />
            <Description productInfo={productInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
