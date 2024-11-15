import OrderDetailContainer from "@/container/Orders";
import React from "react";

interface Props {
  searchParams: {
    transactionId?: string;
    orderId?: string;
  };
}

const Page = ({ searchParams }: Props) => {
  return <OrderDetailContainer searchParams={searchParams} />;
};

export default Page;
