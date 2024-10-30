import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import { LOGO_VNPAY } from "@/constants/common";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import Input from "../common/Input";
import { PAYMENT_METHOD } from "@/constants/data";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethodEnum } from "@/types/common";
import { useRouter } from "next/navigation";
import { CartItemProps } from "@/app/redux/slices/cartSlice";
import { RootState } from "@/app/redux/store";
import { FormState, setFormValues } from "@/app/redux/slices/formSlice";
import SelectMethod from "./SelectMethod";
import { createOrder } from "@/lib/actions/paymentActions";
import Swal from "sweetalert2"; // Import SweetAlert2

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Tên phải có ít nhất 2 ký tự." })
    .max(50, { message: "Tên không được vượt quá 50 ký tự." })
    .regex(/^[\p{L}\s'-]+$/u, {
      message:
        "Tên chỉ có thể chứa chữ cái, khoảng trắng, dấu gạch nối (-) và dấu nháy đơn (').",
    })
    .trim(),
  address: z.string().min(5, "Address is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  paymentMethod: z.enum([PaymentMethodEnum.SHIPCOD, PaymentMethodEnum.VNPAY]),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  user: User | null;
  cartItems: CartItemProps[];
  total: string;
}

const PaymentForm = ({ user, cartItems, total }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.form) as FormState;

  const [showLogout, setShowLogout] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: user?.address || "",
      phoneNumber: user?.phoneNumber || "",
      paymentMethod: PAYMENT_METHOD[0].name,
    },
  });

  const toggleLogout = () => setShowLogout((prev) => !prev);

  const amountInVND = Math.round(parseFloat(total) * 26000);

  const randomRef = () => {
    return `COD${Math.floor(Math.random() * 1000000).toString()}`;
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const newForm: FormState = {
      userId: user?.id,
      name: values.name,
      addressOrder: values.address,
      phoneNumber: values.phoneNumber,
      paymentMethod: values.paymentMethod,
      totalPrice: amountInVND,
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        color: item.color || null,
        sizeName: item.size || null,
      })),
    };

    const confirmResult = await Swal.fire({
      title: "Confirm Order",
      text: "Do you want to confirm your order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmResult.isConfirmed) {
      await dispatch(setFormValues({ ...forms, ...newForm }));

      if (newForm.paymentMethod === "SHIPCOD") {
        const transactionId = randomRef();
        const orderData = {
          transactionId,
          userId: newForm.userId,
          name: newForm.name,
          totalPrice: amountInVND,
          addressOrder: newForm.addressOrder,
          phoneNumber: newForm.phoneNumber,
          paymentMethod: newForm.paymentMethod,
          products: newForm.products,
        };

        try {
          const response = await createOrder(orderData);
          if (response.status === "success") {
            router.push(
              `/payment-result?vnp_TxnRef=${transactionId}&vnp_ResponseCode=00&shipcod`,
            );
          } else {
            console.error("Error creating order:", response);
          }
        } catch (error) {
          console.log("Error creating order:", error);
        }
      } else {
        try {
          const response = await fetch("/api/create_payment_url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: amountInVND,
              orderDescription: `Payment for order from ${values.phoneNumber}`,
              orderType: "billpayment",
              language: "vn",
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create payment URL");
          }

          const data = await response.json();
          if (data?.paymentUrl) {
            window.location.href = data.paymentUrl;
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } else {
      Swal.fire("Order cancelled", "", "info");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-center text-lg font-semibold opacity-80">
          EXPRESS CHECKOUT
        </span>
        <div className="flex justify-center">
          <Button className="min-w-40 cursor-default bg-yellow-200 px-4 py-2">
            <Image
              src={LOGO_VNPAY}
              alt="VNPay"
              width={1000}
              height={1000}
              className="h-4 w-24 object-contain"
            />
          </Button>
        </div>

        <hr />

        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between" onClick={toggleLogout}>
              <span className="opacity-80">Account</span>
              {showLogout ? (
                <ChevronUp className="size-8 cursor-pointer rounded-lg bg-gray-200 px-2 py-1" />
              ) : (
                <ChevronDown className="size-8 cursor-pointer rounded-lg bg-gray-200 px-2 py-1" />
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

        <hr />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <span className="font-extrabold underline">DELIVERY</span>
          <Input
            register={register}
            label="Name"
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
            label="Phone Number"
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
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
