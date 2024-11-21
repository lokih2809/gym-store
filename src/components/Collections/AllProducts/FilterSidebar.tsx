import { X } from "lucide-react";
import React from "react";

interface Props {
  setFilterBox: (status: boolean) => void;
  sort: "newestFirst" | "lowToHigh" | "highToLow";
  setSort: (sort: "newestFirst" | "lowToHigh" | "highToLow") => void;
}

const FilterSidebar = ({ setFilterBox, sort, setSort }: Props) => {
  const filterOptions: {
    label: string;
    value: "newestFirst" | "lowToHigh" | "highToLow";
  }[] = [
    { label: "Newest First", value: "newestFirst" },
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];

  const handleSortChange = (
    value: "newestFirst" | "lowToHigh" | "highToLow",
  ) => {
    setSort(value);
    setFilterBox(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black bg-opacity-30 xl:relative xl:bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-20 animate-slide-in-bottom space-y-4 rounded-lg bg-white px-4 xl:top-0">
          {/* Top */}
          <div className="mt-4 flex items-center justify-around lg:justify-between">
            <X onClick={() => setFilterBox(false)} className="xl:hidden" />
            <span className="mx-auto font-bold uppercase xl:mx-0">
              Filter & Sort
            </span>
          </div>

          <hr />

          {/* Content */}
          <div className="flex flex-col gap-4">
            <span className="font-bold uppercase">Sort by</span>

            {filterOptions.map((option) => (
              <div
                className="flex cursor-pointer items-center gap-4"
                key={option.value}
              >
                <input
                  id={option.value}
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sort === option.value}
                  onChange={() => handleSortChange(option.value)}
                />
                <label
                  className="cursor-pointer select-none"
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
