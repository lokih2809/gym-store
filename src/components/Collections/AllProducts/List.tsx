"use client";

import { LIST_PRODUCTS } from "@/constants/fakeData";
import Item from "./Item";
import FilterButton from "./FilterButton";
import FilterSidebar from "./FilterSidebar";

type Props = {
  limit?: number;
};

const List = ({ limit }: Props) => {
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
          {LIST_PRODUCTS.map((item) => (
            <>
              <Item key={item.id} itemDetail={item} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
