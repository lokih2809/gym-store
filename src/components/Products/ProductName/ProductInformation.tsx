import { PRODUCT_DATA } from "@/constants/fakeData";
import React from "react";

const ProductInformation = () => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-2">
      <span className="rounded bg-gray-100 p-2 text-xs">New</span>
      <span className="text-xl font-bold uppercase">{PRODUCT_DATA.name}</span>
      <span className="capitalize">{PRODUCT_DATA.fit}</span>
      <span>US${PRODUCT_DATA.price}</span>
    </div>
  );
};

export default ProductInformation;
