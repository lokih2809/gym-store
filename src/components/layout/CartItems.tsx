import { CartItemProps, removeFromCart } from "@/app/redux/slices/cartSlice";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { useDispatch } from "react-redux";

interface Props {
  cartItems: CartItemProps[];
}

const CartItems = ({ cartItems }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = (payload: number) => {
    dispatch(removeFromCart(payload));
  };

  const calculateTotal = (items: CartItemProps[]): number => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      <div className="flex h-[90vh] flex-col">
        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-scroll px-8">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 py-8 ${cartItems.length - 1 > index && "border-b"}`}
            >
              <div className="relative h-40 w-36">
                <Image src={item.image} fill alt="" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <small className="max-w-11 rounded-lg bg-gray-200 px-2 py-1 font-bold">
                  NEW
                </small>
                <span className="text-lg">{item.name}</span>
                <span className="text-gray-600">{item.fit}</span>
                <span className="text-gray-600">
                  {item.color} | {item.size}
                </span>
                <span className="font-bold">${item.price}</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="size-8 cursor-pointer rounded-full bg-gray-200 p-2" />
                    <Trash2
                      className="size-8 cursor-pointer rounded-full bg-gray-200 p-2"
                      onClick={() => handleRemove(item.id)}
                    />
                  </div>
                  <span className="text-lg font-bold">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 px-2">
          <div className="space-y-4 border-y p-8">
            <div className="flex items-center justify-between text-lg">
              <span>Sub Total</span>
              <span>{calculateTotal(cartItems).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span>Standard Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>${calculateTotal(cartItems).toFixed(2)}</span>
            </div>
          </div>

          <Button className="flex w-full items-center justify-center gap-4">
            <ShoppingBag />
            CHECKOUT SECURELY
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
