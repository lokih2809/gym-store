import { CircleGauge } from "lucide-react";
import React from "react";
interface Props {
  title: string;
  count: number;
}

const Card = ({ title, count }: Props) => {
  return (
    <>
      <div className="bg-dashboard flex w-full cursor-pointer gap-4 rounded-lg bg-primary p-4 text-white hover:bg-gray-600 md:w-[48%] xl:w-[30%]">
        <CircleGauge />
        <div className="flex flex-col gap-4">
          <span>Total {title}</span>
          <span className="text-lg font-bold">{count}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
