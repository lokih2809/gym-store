import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import PaymentForm from "./PaymentForm";
import { User } from "next-auth";

interface Props {
  user?: User;
}

const Checkout = ({ user }: Props) => {
  const cartItems = useSelector((state: RootState) => {
    return state.cart?.items;
  });

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-3/5 border-r border-gray-200 px-8 py-6">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <PaymentForm user={user} />
          </div>
        </div>

        <div className="w-2/5 bg-gray-100 p-8">
          <CartSummary cartItems={cartItems} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
