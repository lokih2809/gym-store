"use client";

import Item from "./Item";
import FilterButton from "./FilterButton";
import FilterSidebar from "./FilterSidebar";
import { ProductInfo } from "@/interfaces/common";

interface Props {
  listProducts: ProductInfo[];
}

const List = ({ listProducts }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Filter button for mobile */}
        <div className="lg:hidden">
          <FilterButton />
        </div>

        {/* Sidebar */}
        <div className="hidden w-[20%] lg:block xl:w-[15%]">
          <FilterSidebar setShowFilter={() => {}} />
        </div>

        {/* List product */}
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {listProducts.map((item: ProductInfo) => (
            <>
              <Item key={item.id} productInfo={item} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
