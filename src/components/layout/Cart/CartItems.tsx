import { CartItemProps, removeFromCart } from "@/app/redux/slices/cartSlice";
import Button from "@/components/common/Button";
import { calculateTotal } from "@/utils/utils";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  cartItems: CartItemProps[];
}

const CartItems = ({ cartItems }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRemove = (payload: number) => {
    dispatch(removeFromCart(payload));
  };

  return (
    <>
      <div className="flex h-[100vh] flex-col lg:h-[90vh]">
        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-scroll px-8">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 py-8 ${cartItems.length - 1 > index && "border-b"}`}
            >
              <div className="relative h-32 w-28 lg:h-40 lg:w-36">
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
          <div className="space-y-4 border-y p-4 text-sm lg:p-8 lg:text-lg">
            <div className="flex items-center justify-between">
              <span>Sub Total</span>
              <span>{calculateTotal(cartItems).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Standard Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal(cartItems).toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-[30%] flex items-center justify-center px-8 md:mb-[15%] lg:mb-4">
            <Button
              className="w-full gap-4"
              onClick={() => router.push("/checkout")}
              isPrimary
            >
              <ShoppingBag />
              CHECKOUT SECURELY
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
