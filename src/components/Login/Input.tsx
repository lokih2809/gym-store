import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  placeholder?: string;
  name: "username" | "email" | "password" | "confirmPassword" | "name";
  required?: boolean;
  error?: string;
  type?: string;
  register: UseFormRegister<any>;
  value?: string;
};

const Input = ({ label, placeholder, name, error, type, register }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold capitalize">
        {label}
      </label>
      <input
        type={type || "text"}
        {...register(name)}
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
