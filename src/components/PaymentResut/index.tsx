"use client";

import {
  DETAIL_ORDER_WITH_TRANSACTION_ID,
  LOGO_PAYMENT_RESULT,
} from "@/constants/common";
import { Check, Route, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { createOrder } from "@/lib/actions/paymentActions";
import { clearCart } from "@/app/redux/slices/cartSlice";
import { clearFormValues } from "@/app/redux/slices/formSlice";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const route = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>(
    "Đang kiểm tra trạng thái thanh toán...",
  );
  const [messageOrder, setMessageOrder] = useState<string>("Đang tạo đơn hàng");
  const [statusPayment, setStatusPayment] = useState<
    "Success" | "Failed" | "Waiting"
  >("Waiting");

  const form = useSelector((state: RootState) => state.form);
  const vnp_ResponseCode = searchParams?.get("vnp_ResponseCode");
  const vnp_TxnRef = searchParams?.get("vnp_TxnRef") || "";

  useEffect(() => {
    const processPayment = async () => {
      if (vnp_ResponseCode === "00") {
        setMessage(
          `Thanh toán thành công! Mã đơn hàng của bạn là: ${vnp_TxnRef}`,
        );
        setStatusPayment("Success");
        setLoading(true);

        const orderData = {
          transactionId: vnp_TxnRef,
          userId: form.userId,
          totalPrice: form.totalPrice,
          name: form.name,
          addressOrder: form.addressOrder,
          phoneNumber: form.phoneNumber,
          paymentMethod: form.paymentMethod,
          products: form.products,
        };

        const response = await createOrder(orderData);
        setLoading(false);

        if (response.status === "success") {
          setMessageOrder(response.message);
        } else {
          setMessageOrder(
            response.message ||
              "Đơn hàng tạo thất bại, có lỗi xảy ra, vui lòng liên hệ chúng tôi",
          );
        }
      } else {
        setMessage("Thanh toán thất bại, vui lòng thử lại.");
        setStatusPayment("Failed");
        setLoading(false);
      }
    };

    processPayment();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearCart());
      dispatch(clearFormValues());
    }, 2000);
  }, []);

  let icon;
  if (statusPayment === "Success") {
    icon = <Check color="green" className="size-10" strokeWidth={4} />;
  } else if (statusPayment === "Failed") {
    icon = <X color="red" className="size-10" strokeWidth={4} />;
  }

  return (
    <>
      <div className="mt-24 flex w-full flex-col px-4 lg:flex-row lg:px-0">
        {/* Left */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="relative h-96 w-2/3">
            <Image
              src={LOGO_PAYMENT_RESULT}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center gap-8">
          {form.paymentMethod !== "SHIPCOD" && (
            <>
              <h1 className="text-4xl">Kết quả thanh toán</h1>
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-2xl">{message}</span>
              </div>
            </>
          )}
          <div className="py-8">
            {loading ? (
              <div className="flex gap-4">
                <p className="text-lg">{messageOrder}</p>
                <BeatLoader loading margin={10} size={10} speedMultiplier={1} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 lg:flex-row">
                <p className="text-lg">{messageOrder}</p>
                <Link
                  href={`${DETAIL_ORDER_WITH_TRANSACTION_ID}${vnp_TxnRef}`}
                  className="text-sm font-bold underline"
                >
                  Nhấn vào đây để xem chi tiết đơn hàng
                </Link>
              </div>
            )}
          </div>
          <Button
            className="mt-4 w-1/3 bg-blue-600 py-4 text-lg text-white"
            onClick={() => route.push("/")}
          >
            Trang chủ
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
