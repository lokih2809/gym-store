import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "./common/Button";

type Props = {
  setIsCartOpen: (value: boolean) => void;
};

const Cart = ({ setIsCartOpen }: Props) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-black bg-opacity-25">
        <div className="absolute bottom-0 left-0 right-0 top-[10%] z-30 flex animate-slide-in flex-col rounded-t-lg bg-white">
          {/* Top */}
          <div className="flex items-center p-4">
            <b className="mx-auto uppercase">Your bag</b>
            <X onClick={() => setIsCartOpen(false)} />
          </div>

          {/* Content */}
          <div className="m-auto flex flex-col items-center justify-center gap-3">
            <div className="relative h-[30vw] w-[30vw]">
              {" "}
              <Image src={"/noCart.png"} alt="" fill className="object-cover" />
            </div>

            <b className="uppercase">Your bag empty</b>
            <span className="text-gray-400">
              There are no products in your bag
            </span>
            <Button text="Shop mens" className="w-[40vw]" />
            <Button text="Shop womens" className="w-[40vw]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
