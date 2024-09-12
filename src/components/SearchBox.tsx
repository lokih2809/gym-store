import React from "react";
import { Search } from "lucide-react";

type Props = {
  disable?: boolean;
  className?: string;
  onClick?: () => void;
};

const SearchBox = ({ disable, className, onClick }: Props) => {
  return (
    <div
      className={`flex w-full items-center justify-center gap-2 border bg-gray-100 px-4 py-2 lg:w-80 ${className} cursor-pointer hover:bg-gray-200 focus:border`}
      onClick={onClick}
    >
      <Search className="size-5" />
      {!disable ? (
        <input
          type="text"
          placeholder="What are you looking for today?"
          className="w-full cursor-pointer bg-inherit text-sm hover:outline-none focus:outline-none md:text-base"
          disabled={disable}
        />
      ) : (
        <span className="w-full text-sm text-gray-400 md:text-base">
          What are you looking for today?
        </span>
      )}
    </div>
  );
};

export default SearchBox;
