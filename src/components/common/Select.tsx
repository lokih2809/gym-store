import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  dataArray: string[];
  name: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  className?: string;
  error?: string;
  label: string;
}

const Select = ({
  dataArray,
  name,
  register,
  required = false,
  className,
  label,
}: Props) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold capitalize">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        className={`rounded-md border border-gray-300 px-4 py-[11px]`}
        id={name}
        {...(register ? register(name, { required }) : { required })}
      >
        {dataArray.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
