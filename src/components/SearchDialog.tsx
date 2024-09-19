"use client";

import { KEYWORD_SEARCH } from "@/constants/fakeData";
import { ChevronLeft, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import SearchBox from "./SearchBox";

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

const SearchDialog = ({ setIsDialogOpen }: Props) => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-30 h-full w-full bg-black bg-opacity-20 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100">
        <div className="h-full w-full bg-white px-4 md:px-6 lg:h-1/3 lg:px-8">
          {/* Top */}
          <div className="flex items-center justify-between gap-4 py-4">
            <ChevronLeft
              className="cursor-pointer lg:hidden"
              onClick={() => setIsDialogOpen(false)}
            />
            {/* SearchBox */}
            <div className="flex flex-1 justify-center">
              <SearchBox className="w-full" />
            </div>
            <X
              className="hidden cursor-pointer lg:block"
              onClick={() => setIsDialogOpen(false)}
            />
          </div>

          <hr className="mb-4 mt-0 border" />

          {/* Content */}
          <div className="">
            {/* Keyword population */}
            <div className="space-y-4">
              <h3 className="font-bold uppercase">Trending Searches</h3>
              <div className="flex flex-wrap items-center gap-4">
                <TrendingUp />
                {KEYWORD_SEARCH.map((item) => (
                  <Link
                    key={item}
                    href={`/${
                      process.env.NEXT_LINK_PRODUCT
                    }/${item.replace(" ", "-")}`}
                    className="bg-gray-100 px-2 py-1 text-xs font-bold"
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recently viewed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDialog;
