import List from "@/components/Collections/AllProducts/List";
import React from "react";

const AllProducts = () => {
  return (
    <>
      <div className="px-4 lg:px-8">
        {/* TOP */}
        <div className="flex flex-col gap-4 py-6">
          <div className="flex items-center">
            <b className="text-xl lg:text-2xl">ALL PRODUCTS</b>
            <span className="ml-4 text-xs">1000 Products</span>
          </div>
          <span className="text-sm">Shop all products</span>
        </div>

        {/* Content */}
        <div className="">
          <List limit={4} />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
