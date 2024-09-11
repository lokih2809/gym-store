"use client";

import { keywordSearch } from "@/constants/fakeData";
import { ChevronLeft, Search, TrendingUp, X } from "lucide-react";
import Link from "next/link";

type Props = {
    setIsDialogOpen: (value: boolean) => void;
};

const SearchDialog = ({ setIsDialogOpen }: Props) => {
    return (
        <div className="absolute z-20 w-full h-full bg-black bg-opacity-20 top-0 right-0 bottom-0 left-0 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100">
            <div className="w-full bg-white h-full lg:h-1/3">
                {/* Header */}
                <div className="flex justify-between items-center py-4 gap-4 px-8">
                    <ChevronLeft
                        className="lg:hidden cursor-pointer"
                        onClick={() => setIsDialogOpen(false)}
                    />
                    {/* SearchBox */}
                    <div className="flex-1 flex justify-center ">
                        <div className="flex gap-2 py-2 px-4 items-center border w-full lg:w-80 justify-center bg-gray-100">
                            <Search className="size-5" />
                            <input
                                type="text"
                                placeholder="What are you looking for today?"
                                className="hover:outline-none focus:outline-none w-full bg-gray-100"
                            />
                        </div>
                    </div>
                    <X
                        className="cursor-pointer hidden lg:block "
                        onClick={() => setIsDialogOpen(false)}
                    />
                </div>

                <hr className="border mt-0 mb-4" />

                {/* Body */}
                <div className="px-8">
                    {/* Keyword population */}
                    <div className="space-y-4">
                        <h3 className="uppercase font-bold">Trending Searches</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                            <TrendingUp />
                            {keywordSearch.map((item) => (
                                <Link
                                    key={item.name}
                                    href={`/${
                                        process.env.NEXT_LINK_PRODUCT
                                    }/${item.name.replace(" ", "-")}`}
                                    className="px-2 py-1 bg-gray-100 text-xs font-bold"
                                >
                                    {item.name.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recently viewed */}
                </div>
            </div>
        </div>
    );
};

export default SearchDialog;
