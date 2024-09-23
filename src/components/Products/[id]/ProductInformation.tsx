import { ProductInfo } from "@/interfaces/common";
import React from "react";

const ProductInformation = ({ productInfo }: { productInfo?: ProductInfo }) => {
  return (
    <>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <span className="rounded bg-gray-100 p-2 text-xs">New</span>
        <span className="text-xl font-bold uppercase">{productInfo?.name}</span>
        <span className="capitalize">{productInfo?.fit}</span>
        <span>US${productInfo?.price}</span>
      </div>
    </>
  );
};

export default ProductInformation;
