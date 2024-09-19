import Image from "next/image";
import React from "react";

const OrderHistory = () => {
  return (
    <>
      <div className="flex flex-1 flex-col px-4">
        {/* Top */}
        <span className="text-xl font-bold uppercase">Your Order</span>

        {/* Main */}
        <div className="m-auto flex flex-col items-center justify-center">
          <Image
            src={"/noHistory.png"}
            alt=""
            width={1920}
            height={1920}
            className="size-32 object-cover"
          />
          <span className="text-lg font-bold">No order</span>
          <span>You’ve made no orders</span>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
