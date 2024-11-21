"use client";

import React, { useState } from "react";
import { LayoutGrid, SlidersHorizontal, Tablet } from "lucide-react";

interface Props {
  filterBox: boolean;
  setFilterBox: (value: boolean) => void;
}

const FilterButton = ({ filterBox, setFilterBox }: Props) => {
  const [layout, setLayout] = useState("grid");

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-[48%] justify-around rounded-full bg-gray-200 p-1">
          <div
            className={`px-[18%] py-2 ${layout === "grid" && "rounded-full bg-white text-black"}`}
            onClick={() => setLayout("grid")}
          >
            <LayoutGrid size={20} />
          </div>
          <div
            className={`px-[18%] py-2 ${layout === "tablet" && "rounded-full bg-white text-black"}`}
            onClick={() => setLayout("tablet")}
          >
            <Tablet size={20} />
          </div>
        </div>

        <div
          className="flex w-[48%] items-center justify-center gap-2 rounded-full bg-gray-200 px-2 py-3"
          onClick={() => setFilterBox(true)}
        >
          <SlidersHorizontal size={20} />
          <span className="text-xs font-bold">FILTER & SORT</span>
        </div>
      </div>
    </>
  );
};

export default FilterButton;
