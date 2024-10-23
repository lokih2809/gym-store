"use client";

import { LOGO_2 } from "@/constants/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CheckoutLayout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <>
      <div>
        <div className="border-b px-24 py-8">
          <div
            className="relative h-8 w-40 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={LOGO_2} alt="" fill />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default CheckoutLayout;
