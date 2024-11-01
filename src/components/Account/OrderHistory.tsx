import { DETAIL_ORDER_WITH_TRANSACTION_ID } from "@/constants/common";
import { OrderWithProduct } from "@/types/common";
import { formatDate } from "@/utils/utils";
import { Order } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  listOrders: OrderWithProduct[];
}

const OrderHistory = ({ listOrders }: Props) => {
  const route = useRouter();
  return (
    <>
      <div className="flex flex-1 flex-col lg:px-4">
        {/* Top */}
        <span className="text-lg font-bold uppercase lg:text-xl">
          Your Order
        </span>

        {/* Main */}
        {listOrders && listOrders.length > 0 ? (
          <div className="relative mt-8 flex-1 px-2 sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="border-b text-xs uppercase text-black">
                <tr>
                  <th scope="col" className="lg:px-12 lg:py-4">
                    Products
                  </th>
                  <th scope="col" className="lg: hidden px-6 py-4">
                    Payment Method
                  </th>
                  <th scope="col" className="hidden px-6 py-4 lg:table-cell">
                    Total Price
                  </th>
                  <th scope="col" className="hidden px-6 py-4 lg:table-cell">
                    Payment Status
                  </th>
                  <th scope="col" className="hidden px-6 py-4 lg:table-cell">
                    CreatedAt
                  </th>
                  <th scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                    Status
                  </th>
                  <th scope="col" className="py-2 lg:px-6 lg:py-4"></th>
                </tr>
              </thead>
              <tbody>
                {listOrders.map((order: OrderWithProduct, index: number) => (
                  <tr
                    className={`text-black ${listOrders.length - 1 > index && "border-b"}`}
                    key={order.id}
                  >
                    <th
                      scope="row"
                      className="max-w-40 truncate whitespace-nowrap font-medium lg:px-12 lg:py-4"
                    >
                      {order.orderItems.map((item, index) => (
                        <span key={item.id}>
                          {`${item.product.name} (${item.color || "no color"}, ${item.size || "no size"})`}
                          {order.orderItems.length - 1 > index && ", "}
                        </span>
                      ))}
                    </th>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      {order.paymentMethod}
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      {order.totalPrice.toLocaleString("vi-VN")}đ
                    </td>

                    <td className="hidden px-6 py-4 lg:table-cell">
                      {order.paymentStatus}
                    </td>
                    <td className="hidden px-6 py-4 lg:table-cell">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-4 lg:px-6 lg:py-4">
                      <span
                        className={`rounded-lg p-1 text-xs font-bold lg:p-2 ${order.status === "PENDING" ? "bg-yellow-400" : order.status === "PROCESSING" ? "bg-blue-400" : order.status === "COMPLETED" ? "bg-green-400" : "bg-red-400"}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-2 lg:px-6 lg:py-4">
                      <button
                        className="font-medium text-blue-500 hover:underline"
                        onClick={() =>
                          route.push(
                            `${DETAIL_ORDER_WITH_TRANSACTION_ID}${order.transactionId}`,
                          )
                        }
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="m-auto flex flex-col items-center justify-center">
            <Image
              src={"/noHistory.png"}
              alt=""
              width={1920}
              height={1920}
              className="size-32 object-cover"
            />
            <span className="text-lg font-bold">No order</span>
            <span>You’ve made no orders</span>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
