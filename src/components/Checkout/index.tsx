import { RootState } from "@/app/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import PaymentForm from "./PaymentForm";
import { calculateTotal } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const route = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart?.items);

  const total = calculateTotal(cartItems).toFixed(2);

  const user = useSelector((state: RootState) => state.session.user);

  if (!user) route.push("/login");

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex w-full border-r border-gray-200 px-8 py-6 lg:w-3/5">
          <div className="w-0 lg:w-1/2"></div>
          <div className="w-full lg:w-1/2">
            <PaymentForm user={user} cartItems={cartItems} total={total} />
          </div>
        </div>

        <div className="w-full bg-gray-100 p-8 lg:w-2/5">
          <CartSummary cartItems={cartItems} total={total} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
