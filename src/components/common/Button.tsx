import React from "react";

type Props = {
  text?: string;
  className: string;
  children?: React.ReactNode;
};

const Button = ({ text, className, children }: Props) => {
  return (
    <>
      <div
        className={`${className} rounded-full bg-black py-3 text-center text-sm font-bold uppercase text-white`}
      >
        {text || children}
      </div>
    </>
  );
};

export default Button;
