import { CircleGauge } from "lucide-react";
import React from "react";

const Card = () => {
  return (
    <>
      <div className="bg-dashboard flex w-full cursor-pointer gap-4 rounded-lg bg-primary p-4 text-white hover:bg-gray-600 md:w-[48%] xl:w-[30%]">
        <CircleGauge />
        <div className="flex flex-col gap-4">
          <span>Total Orders</span>
          <span className="text-lg font-bold">10.000</span>
          <small>12% more than previous week</small>
        </div>
      </div>
    </>
  );
};

export default Card;
