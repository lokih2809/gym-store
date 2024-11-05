import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isPrimary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({
  children,
  className,
  type,
  disabled = false,
  isPrimary = false,
  onClick,
}: Props) => {
  return (
    <>
      <button
        className={`flex cursor-pointer items-center justify-center rounded-full text-sm font-bold uppercase ${className} ${isPrimary && "bg-black py-3 text-white"} ${disabled && "cursor-default opacity-80"}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
