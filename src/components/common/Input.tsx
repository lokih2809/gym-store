import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  className?: string;
};

const Input = ({
  label,
  placeholder,
  name,
  error,
  type,
  register,
  required,
  className,
}: Props) => {
  return (
    <div className={`flex min-h-24 flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold capitalize">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type || "text"}
        {...(register ? register(name, { required }) : { required })}
        id={name}
        placeholder={`Enter ${placeholder || label}`}
        className={`rounded-md border px-4 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default Input;
