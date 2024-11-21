"use client";

import { ProductInfo } from "@/types/common";
import FilterButton from "./FilterButton";
import FilterSidebar from "./FilterSidebar";
import ListProducts from "@/components/common/ListProducts";
import { useState } from "react";

interface Props {
  listProducts: ProductInfo[];
  sort: "newestFirst" | "lowToHigh" | "highToLow";
  setSort: (sort: "newestFirst" | "lowToHigh" | "highToLow") => void;
}

const List = ({ listProducts, sort, setSort }: Props) => {
  const [filterBox, setFilterBox] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Filter button for mobile */}
        <div className="xl:hidden">
          <FilterButton filterBox={filterBox} setFilterBox={setFilterBox} />
        </div>

        {/* Sidebar */}
        <div
          className={`w-full xl:w-[15%] ${filterBox ? "block" : "hidden"} xl:block`}
        >
          <FilterSidebar
            setFilterBox={setFilterBox}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* List product */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          <ListProducts listProducts={listProducts} />
        </div>
      </div>
    </>
  );
};

export default List;
