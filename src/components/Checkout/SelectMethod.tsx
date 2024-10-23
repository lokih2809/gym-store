import { PaymentMethodEnum } from "@/types/common";
import Image from "next/image";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type PaymentMethod = {
  name: PaymentMethodEnum;
  logo: string;
};

type Props = {
  methods: PaymentMethod[];
  register: UseFormRegister<any>;
  name: string;
};

const SelectMethod = ({ methods, register, name }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {methods.map((method) => (
        <label key={method.name} className="flex cursor-pointer items-center">
          <input
            type="radio"
            value={method.name}
            {...register(name)}
            className="mr-2"
          />
          <Image
            src={method.logo}
            alt={method.name}
            width={200}
            height={200}
            className="ml-4 h-10 w-20 object-contain"
          />
        </label>
      ))}
    </div>
  );
};

export default SelectMethod;
