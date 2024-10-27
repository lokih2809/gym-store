import { CartItemProps } from "@/app/redux/slices/cartSlice";
import { calculateTotal } from "@/utils/utils";
import Image from "next/image";
import React from "react";

type Props = {
  cartItems: CartItemProps[];
  total: string;
};

const CartSummary = ({ cartItems, total }: Props) => {
  return (
    <>
      <div className="space-y-6 lg:w-2/3">
        {/* Top */}
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative">
              <div className="relative size-16 overflow-hidden rounded-md border border-gray-400">
                <Image src={item.image} alt="" fill className="object-cover" />
              </div>
              <span className="absolute -right-2 -top-2 rounded-full bg-black bg-opacity-60 px-2 py-1 text-xs font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col">
                <span>
                  {item.name} - {item.color}
                </span>
                <small className="opacity-80">
                  {item.size} | {item.fit}
                </small>
              </div>
              <span>${item.price}</span>
            </div>
          </div>
        ))}

        <hr />

        {/* Bottom */}
        <div className="space-y-6">
          <span className="cursor-pointer text-sm underline">
            Been referred by a friend?
          </span>
          <div className="flex justify-between">
            <span>
              Subtotal * {cartItems.length}
              {cartItems.length < 2 ? "item" : "items"}
            </span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>usd ${total}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
