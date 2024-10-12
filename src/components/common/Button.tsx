import React from "react";

type Props = {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  text,
  className,
  children,
  type,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`${className} rounded-full bg-black py-3 text-center text-sm font-bold uppercase text-white ${disabled && "opacity-80"}`}
      type={type}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};

export default Button;
