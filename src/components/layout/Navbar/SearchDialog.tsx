"use client";

import { ChevronLeft, Heart, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";
import { BeatLoader, ClipLoader } from "react-spinners";
import { KEYWORD_SEARCH } from "@/constants/data";
import { searchProducts } from "@/lib/actions/productActions";
import { ProductColor } from "@prisma/client";
import { ListProducts, ProductInfo } from "@/types/common";
import { PRODUCT_LINK } from "@/constants/common";
import SearchBox from "./SearchBox";

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

const SearchDialog = ({ setIsDialogOpen }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ProductInfo[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchValue, 1000);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current?.focus();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = e.target.value;
    setLoading(true);
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
      const fakeSuggestions = await getSuggestions(searchValue);
      setSuggestions(fakeSuggestions);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchValue(suggestion);
    setSuggestions([]);
  };

  const getSuggestions = async (value: string) => {
    const fakeSuggestionData = [
      "Gym Shorts",
      "Gym Shoes",
      "T-Shirts",
      "Dumbbells",
    ];
    return fakeSuggestionData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const products = await searchProducts(debouncedValue);
        setSearchResult(products);
      } catch (error) {
        console.error(error);
        setSearchResult([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [debouncedValue]);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-30 h-screen w-full bg-black bg-opacity-20 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100">
        <div className="h-full w-full overflow-y-scroll bg-white px-4 md:px-6 lg:h-auto lg:px-8">
          {/* Top */}
          <div className="flex items-center justify-between gap-4 py-4">
            <ChevronLeft
              className="cursor-pointer lg:hidden"
              onClick={() => setIsDialogOpen(false)}
            />
            {/* SearchBox */}
            <div className="flex flex-1 justify-center">
              <SearchBox
                className="w-full lg:w-[20vw]"
                searchValue={searchValue}
                handleChange={handleChange}
                handleClear={handleClear}
              />
            </div>
            <X
              className="hidden cursor-pointer lg:block"
              onClick={() => setIsDialogOpen(false)}
            />
          </div>

          <hr className="mb-4 mt-0 border" />

          {/* Content */}
          {searchValue === "" ? (
            <div className="lg:px-[15vw]">
              {/* Keyword population */}
              <div className="space-y-4 pb-12">
                <h3 className="font-bold uppercase">Trending Searches</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <TrendingUp />
                  {KEYWORD_SEARCH.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setLoading(true);
                        setSearchValue(item);
                      }}
                      className="cursor-pointer bg-gray-100 px-2 py-1 text-xs font-bold"
                    >
                      {item.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:px-[15vw]">
              {/* Suggestions */}
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold uppercase">Suggestions</span>
                <hr />
                {/* */}
                <div className="flex gap-2 lg:flex-col">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="cursor-pointer bg-gray-100 px-2 py-1 text-xs"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="flex flex-1 flex-col gap-4">
                <span className="text-sm font-bold uppercase">Products</span>
                <hr />

                <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:grid-cols-4 lg:grid-rows-1">
                  {/* Loading */}
                  {loading && (
                    <div className="text-black">
                      <BeatLoader
                        loading
                        margin={10}
                        size={15}
                        speedMultiplier={1}
                      />
                    </div>
                  )}

                  {/* Search result */}
                  {!loading &&
                    searchResult.length > 0 &&
                    searchResult.map((product) => (
                      <div key={product.sku}>
                        {/* Image product */}
                        <div className={"relative h-[30vh] w-full lg:h-[35vh]"}>
                          <Image
                            src={product.colors[0].images[0]}
                            alt={product.name}
                            fill
                            sizes="1000"
                            className="object-cover"
                          />

                          <div className="absolute right-2 top-2 z-10 rounded-full bg-white p-1">
                            <Heart size={20} />
                          </div>
                        </div>

                        {/* Information */}
                        <Link
                          href={`${PRODUCT_LINK}/${product.id}`}
                          className="flex flex-col py-2 text-sm"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          <span className="font-bold">{product.name}</span>
                          <span>
                            {searchResult.length > 0 &&
                              product.colors.map(
                                (color: ProductColor, index: number) => (
                                  <span
                                    key={color.colorName}
                                    className="text-gray-500"
                                  >
                                    {color.colorName}{" "}
                                    {index < product.colors.length - 1 && "/ "}
                                  </span>
                                ),
                              )}
                          </span>
                          <b className="text-red-500">US$ {product.price}</b>
                        </Link>
                      </div>
                    ))}

                  {/* No products */}
                  {!loading && searchResult.length === 0 && (
                    <span className="m-auto py-4 font-bold">
                      No products found
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDialog;
