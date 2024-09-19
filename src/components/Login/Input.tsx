import React from "react";

type Props = {
  type?: string;
  label: string;
  placeholder?: string;
};

const Input = ({ type = "text", label, placeholder }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="text-sm font-semibold capitalize">
          {label}
        </label>
        <input
          type={type}
          placeholder={`Enter ${placeholder || label}`}
          className="rounded-md border border-gray-300 px-4 py-2"
        />
      </div>
    </>
  );
};

export default Input;
