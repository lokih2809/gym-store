import { X } from "lucide-react";
import React from "react";

interface Props {
  setShowFilter: (value: boolean) => void;
}

const FilterSidebar = ({ setShowFilter }: Props) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black bg-opacity-30 lg:relative lg:bg-white">
        <div className="absolute bottom-0 left-0 right-0 top-20 animate-slide-in-bottom space-y-4 rounded-lg bg-white px-4 lg:top-0">
          {/* Top */}
          <div className="mt-4 flex items-center justify-around lg:justify-between">
            <X onClick={() => setShowFilter(false)} className="lg:hidden" />
            <span className="mx-auto font-bold uppercase lg:mx-0">
              Filter & Sort
            </span>
            <span className="text-sm text-gray-500">Clear all</span>
          </div>

          <hr />

          {/* Content */}
          <div className="">
            <span className="font-bold uppercase">Sort by</span>
            <div className="flex items-center gap-4">
              <input type="radio" />
              <label>Price: Low to high</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
