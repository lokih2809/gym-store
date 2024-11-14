import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  register?: UseFormRegister<any>;
  className?: string;
  disabled?: boolean;
}

const Input = ({
  label,
  placeholder,
  name,
  error,
  type,
  register,
  className,
  disabled,
}: Props) => {
  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={name} className="text-sm font-semibold capitalize">
          {label || name}
          <span className="text-red-500"> *</span>
        </label>
        <input
          type={type || "text"}
          {...register?.(name)}
          id={name}
          placeholder={`Enter ${placeholder || label || name}`}
          className={`rounded-md border px-4 py-2 ${disabled && "bg-gray-200 opacity-80"} ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          list="products"
          disabled={disabled}
        />
        {error && <small className="text-red-500">{error}</small>}
      </div>
    </>
  );
};

export default Input;
