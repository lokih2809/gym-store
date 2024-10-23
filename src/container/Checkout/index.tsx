"use client";

import Checkout from "@/components/Checkout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const CheckoutContainer = () => {
  const { data: session } = useSession();

  return <Checkout user={session?.user} />;
};

export default CheckoutContainer;
