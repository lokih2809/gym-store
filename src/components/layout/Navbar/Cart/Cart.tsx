import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PRODUCT_CATEGORIES } from "@/constants/data";
import Link from "next/link";
import { COLLECTIONS_LINK } from "@/constants/common";
import CartItems from "./CartItems";
import Button from "@/components/common/Button";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => {
    return state.cart?.items;
  });

  return (
    <>
      <div className="relative">
        <div className="cursor-pointer p-2 hover:rounded-full hover:bg-gray-100">
          <ShoppingCart onClick={() => setIsCartOpen(true)} className=" " />
        </div>
        {cartItems.length > 0 && (
          <span className="absolute -right-4 -top-2 z-10 rounded-full bg-blue-300 px-2 py-[1px] text-sm font-bold">
            {cartItems.length}
          </span>
        )}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-20 bg-black bg-opacity-25 ${!isCartOpen && "hidden"}`}
      >
        <div className="fixed bottom-0 left-0 right-0 top-0 z-30 flex animate-slide-in-bottom flex-col rounded-t-lg bg-white lg:left-3/4 lg:top-0 lg:animate-slide-in-right">
          {/* Top */}
          <div className="flex items-center p-4 lg:p-8">
            <b className="mx-auto uppercase">Your bag</b>
            <X
              onClick={() => setIsCartOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Content */}
          <div>
            {cartItems.length ? (
              <CartItems cartItems={cartItems} />
            ) : (
              <div className="m-auto flex flex-col items-center justify-center gap-3 lg:gap-8">
                <div className="relative h-[30vw] w-[30vw] lg:size-60">
                  <Image
                    src={"/noProduct.jpg"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <b className="uppercase">Your bag empty</b>
                <span className="text-gray-400">
                  There are no products in your bag
                </span>
                {PRODUCT_CATEGORIES.map((i) => (
                  <Link
                    key={i.name}
                    href={`${COLLECTIONS_LINK}/${i.name.replace("'s", "")}`}
                  >
                    <Button className="w-[40vw] lg:w-60" isPrimary>
                      Shop {i.name}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
