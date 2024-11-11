import React from "react";
import { Search, X } from "lucide-react";

interface Props {
  disable?: boolean;
  className?: string;
  searchValue?: string;
  onClick?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
}

const SearchBox = ({
  disable,
  className,
  searchValue,
  onClick,
  handleChange,
  handleClear,
}: Props) => {
  return (
    <>
      <div
        className={`flex items-center justify-center gap-2 border bg-gray-100 px-4 py-2 ${className} hover:bg-gray-200 focus:border`}
        onClick={onClick}
      >
        <Search className="size-5" />
        {!disable ? (
          <input
            type="text"
            placeholder="What are you looking for today?"
            className="w-full bg-inherit text-sm hover:outline-none focus:outline-none md:text-base"
            disabled={disable}
            onChange={handleChange}
            value={searchValue}
          />
        ) : (
          <span className="w-full text-sm text-gray-400 md:text-base">
            What are you looking for today?
          </span>
        )}
        <X className="cursor-pointer" onClick={handleClear} />
      </div>
    </>
  );
};

export default SearchBox;
