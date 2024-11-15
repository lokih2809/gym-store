"use client";

import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import { STATUS } from "@/constants/data";
import { OrderWithUser } from "@/types/common";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateStatusOrder } from "@/lib/actions/OrderActions";

interface Props {
  order: OrderWithUser;
}

type FormValues = {
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELED";
};

const UpdateStatus = ({ order }: Props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      status: order.status,
    },
  });

  const { register, handleSubmit } = methods;

  const thenSuccess = () => {
    setShow(false);
    router.refresh();
  };

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    const confirmResult = await confirmWithNotification(
      "Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng này?",
    );
    if (!confirmResult.isConfirmed) return;

    try {
      const response = await updateStatusOrder(order.id, value.status);
      showNotification({
        response,
        thenSuccess,
      });
    } catch (error) {
      catchErrorSystem();
    }
  };

  return (
    <>
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex w-11/12 animate-slide-in-bottom flex-col rounded-lg bg-white py-8 text-black lg:w-1/3 lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Information</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <form
              className="flex flex-col justify-center gap-8 px-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span>
                Tên người nhận: <strong>{order.name || order.user.name}</strong>
              </span>
              <span>
                Mail người nhận: <strong>{order.user.email}</strong>
              </span>
              <span>
                Số điện thoại:{" "}
                <strong>{order.phoneNumber || order.user.phoneNumber}</strong>
              </span>
              <span>
                Địa chỉ người nhận: <strong>{order.addressOrder}</strong>
              </span>
              <span>
                Hình thức thanh toán: <strong>{order.paymentMethod}</strong>
              </span>
              <span>
                Trạng thái thanh toán: <strong>{order.paymentStatus}</strong>
              </span>
              <ul className="list-inside list-decimal">
                <span>Danh sách sản phẩm:</span>
                {order.orderItems.map((item) => (
                  <li key={item.id} className="ml-2">
                    {item.product.name} - {item.color} -{" "}
                    {item.size || "No size"} - SL: {item.quantity}
                  </li>
                ))}
              </ul>
              <span>
                Giá trị đơn hàng: <strong>{order.totalPrice}</strong>
              </span>
              <Select
                dataArray={STATUS}
                name="status"
                register={register}
                label="Trạng thái đơn hàng"
              />
              <Button className="w-full" type="submit" isPrimary>
                Cập nhật trạng thái
              </Button>
            </form>
          </div>
        </div>
      )}

      <button
        className="font-medium text-blue-500 hover:underline"
        onClick={() => setShow(true)}
      >
        More
      </button>
    </>
  );
};

export default UpdateStatus;
