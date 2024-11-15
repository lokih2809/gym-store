"use client";

import {
  DETAIL_ORDER_WITH_TRANSACTION_ID,
  LOGO_PAYMENT_RESULT,
} from "@/constants/common";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { clearCart } from "@/app/redux/slices/cartSlice";
import { clearFormValues } from "@/app/redux/slices/formSlice";
import { createOrder } from "@/lib/actions/OrderActions";

const PaymentResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMessage, setPaymentMessage] = useState<string>(
    "Đang kiểm tra trạng thái thanh toán...",
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failed" | null
  >(null);

  const [orderMessage, setOrderMessage] = useState<string>("Đang tạo đơn hàng");

  const vnp_ResponseCode = searchParams?.get("vnp_ResponseCode");
  const vnp_TxnRef = searchParams?.get("vnp_TxnRef") || "";
  const shipCodParams = searchParams?.get("ship_cod");

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

  useEffect(() => {
    const processPayment = async () => {
      if (vnp_ResponseCode === "00") {
        setPaymentStatus("success");
        setPaymentMessage(
          `Thanh toán thành công! Mã đơn hàng của bạn là: ${vnp_TxnRef}`,
        );
        setLoading(true);

        const response = await createOrder(orderData);
        setLoading(false);

        if (response.status === "success") {
          setOrderMessage(response.message);
          dispatch(clearCart());
          dispatch(clearFormValues());
        } else {
          setOrderMessage(
            "Đơn hàng tạo thất bại, có lỗi xảy ra, vui lòng liên hệ chúng tôi",
          );
        }
      } else if (shipCodParams === "00") {
        const response = await createOrder(orderData);
        setLoading(false);

        if (response.status === "success") {
          setOrderMessage(response.message);
          dispatch(clearCart());
          dispatch(clearFormValues());
        } else {
          setOrderMessage(
            "Đơn hàng bạn đã tồn tại, nếu có lỗi xảy ra vui lòng liên hệ chúng tôi !",
          );
        }
      } else {
        setPaymentStatus("failed");
        setPaymentMessage("Thanh toán thất bại, vui lòng thử lại.");
        setLoading(false);
      }
    };
    processPayment();
  }, []);

  let icon;
  if (paymentStatus === "success") {
    icon = <Check color="green" className="size-10" strokeWidth={4} />;
  } else if (paymentStatus === "failed") {
    icon = <X color="red" className="size-10" strokeWidth={4} />;
  }

  return (
    <>
      <div className="mt-24 flex w-full flex-col gap-4 px-4 xl:flex-row xl:px-0">
        {/* Left */}
        <div className="flex w-full items-center justify-center xl:w-1/2">
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
        <div className="flex flex-col items-center gap-4">
          {form.paymentMethod !== "SHIPCOD" && (
            <>
              <h1 className="text-lg font-bold xl:text-3xl">
                Kết quả thanh toán
              </h1>
              <div className="flex items-center gap-4">
                {icon}
                <span className="xl:text-2xl">{paymentMessage}</span>
              </div>{" "}
            </>
          )}

          {paymentStatus !== "failed" && (
            <div className="py-8">
              {loading ? (
                <div className="flex gap-4">
                  <p className="text-lg">{orderMessage}</p>
                  <BeatLoader
                    loading
                    margin={10}
                    size={10}
                    speedMultiplier={1}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-center text-lg xl:text-start">
                    {orderMessage}
                  </p>
                  <Link
                    href={`${DETAIL_ORDER_WITH_TRANSACTION_ID}${vnp_TxnRef}`}
                    className="font-bold underline"
                  >
                    Nhấn vào đây để xem chi tiết đơn hàng
                  </Link>
                </div>
              )}
            </div>
          )}
          <Button
            className="mt-4 w-1/3 bg-blue-600 px-6 py-4 text-lg text-white"
            onClick={() => router.push("/")}
          >
            Trang chủ
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
