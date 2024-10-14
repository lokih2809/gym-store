import { Search } from "lucide-react";
import React from "react";

interface Props {
  placeholder: string;
}

const SearchBoxDashboard = ({ placeholder }: Props) => {
  return (
    <>
      <div className="flex gap-2 rounded-lg border bg-gray-600 p-1">
        <Search />
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchBoxDashboard;
