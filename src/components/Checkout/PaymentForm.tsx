"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "next-auth";
import Button from "../common/Button";
import { LOGO_GPAY, LOGO_MOMO, LOGO_VNPAY } from "@/constants/common";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import Input from "../common/Input";
import SelectMethod from "./SelectMethod";
import { PAYMENT_METHOD } from "@/constants/data";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethodEnum } from "@/types/common";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(5, "Address is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Số điện thoại phải chỉ chứa ký tự số")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(15, "Số điện thoại không được vượt quá 15 chữ số"),
  paymentMethod: z.enum([
    PaymentMethodEnum.SHIPCOD,
    PaymentMethodEnum.VNPAY,
    PaymentMethodEnum.MOMO,
    PaymentMethodEnum.GPAY,
  ]),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  user?: User;
}

const PaymentForm = ({ user }: Props) => {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phoneNumber: "",
      paymentMethod: PAYMENT_METHOD[0].name,
    },
    resolver: zodResolver(FormSchema),
  });

  const handleToggle = () => {
    setShowLogout((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      setValue("phoneNumber", user.phoneNumber || "");
      setValue("address", user.address || "");
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    console.log("Dữ liệu từ form:", values);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col gap-4">
          <span className="text-center text-lg font-semibold opacity-80">
            EXPRESS CHECKOUT
          </span>

          {/* Logo */}
          <div className="flex gap-4">
            <Button className="min-w-40 cursor-default bg-yellow-200 px-4 py-2">
              <Image
                src={LOGO_VNPAY}
                alt=""
                width={1000}
                height={1000}
                className="h-4 w-24 object-contain"
              />
            </Button>

            <Button className="min-w-40 cursor-default border bg-blue-200 px-4">
              <Image
                src={LOGO_GPAY}
                alt=""
                width={1000}
                height={1000}
                className="h-4 w-10 object-cover"
              />
            </Button>

            <Button className="min-w-40 cursor-default border bg-[#A60063] px-4">
              <Image
                src={LOGO_MOMO}
                alt=""
                width={1000}
                height={1000}
                className="h-4 w-16 object-contain"
              />
            </Button>
          </div>

          <hr />

          <div className="">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="opacity-80">Account</span>
                  {showLogout ? (
                    <ChevronUp
                      onClick={handleToggle}
                      className="size-8 cursor-pointer rounded-lg bg-gray-200 px-2 py-1"
                    />
                  ) : (
                    <ChevronDown
                      onClick={handleToggle}
                      className="size-8 cursor-pointer rounded-lg bg-gray-200 px-2 py-1"
                    />
                  )}
                </div>
                <span className="text-sm font-bold">{user.email}</span>
                <span className="text-sm">{user.name}</span>
                {showLogout && (
                  <span className="animate-slide-in-top cursor-pointer text-sm underline">
                    Logout
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold">CONTACT</span>
                  <span
                    className="cursor-pointer text-sm underline opacity-80"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </span>
                </div>
                <Input name="email" />
              </div>
            )}
          </div>

          <hr />

          <div className="flex flex-col gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <span className="font-extrabold underline">DELIVERY</span>
              <Input
                register={register}
                name="name"
                error={errors.name?.message}
              />
              <Input
                register={register}
                name="address"
                error={errors.address?.message}
              />
              <Input
                register={register}
                name="phoneNumber"
                error={errors.phoneNumber?.message}
              />

              <span className="font-extrabold underline">PAYMENT</span>

              <SelectMethod
                methods={PAYMENT_METHOD}
                register={register}
                name="paymentMethod"
              />
              <Button type="submit" className="w-full" isPrimary>
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
