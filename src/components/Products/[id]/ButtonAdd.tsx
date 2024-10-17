import React from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const ButtonAdd = ({ onClick }: Props) => {
  return (
    <>
      <button
        className="rounded-full bg-black py-4 text-sm font-bold uppercase text-white"
        onClick={onClick}
      >
        Add to bag
      </button>
    </>
  );
};

export default ButtonAdd;
