import { Search } from "lucide-react";
import React from "react";

interface Props {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBoxDashboard = ({ placeholder, value, onChange }: Props) => {
  return (
    <>
      <div className="flex gap-2 rounded-lg border bg-gray-600 p-1">
        <Search />
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SearchBoxDashboard;
