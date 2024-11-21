"use client";

import { ProductInfo } from "@/types/common";
import List from "./List";
import { useMemo, useState } from "react";

interface Props {
  listProducts: ProductInfo[];
  category: string | undefined;
}

const AllProducts = ({ listProducts, category }: Props) => {
  const [sort, setSort] = useState<"newestFirst" | "lowToHigh" | "highToLow">(
    "newestFirst",
  );

  const sortedProducts = useMemo(() => {
    let sorted = [...listProducts];
    if (sort === "newestFirst") return sorted;
    if (sort === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [sort, listProducts]);

  return (
    <>
      <div className="px-4 xl:px-8">
        {/* TOP */}
        <div className="flex flex-col gap-4 py-4 xl:py-8">
          <b className="text-xl uppercase xl:text-2xl">
            {category ? category : "all products"}
          </b>
          <span className="text-xs">{listProducts.length} Products</span>
        </div>

        {/* Content */}
        <div>
          {listProducts.length > 0 ? (
            <List listProducts={sortedProducts} sort={sort} setSort={setSort} />
          ) : (
            <div className="py-4 text-center">No products found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
