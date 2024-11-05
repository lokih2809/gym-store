import { OrderWithUser } from "@/types/common";
import { formatDate } from "@/utils/utils";
import React from "react";
import UpdateStatus from "./Orders/UpdateStatus";

interface Props {
  listOrders: OrderWithUser[];
}

const Transactions = ({ listOrders }: Props) => {
  return (
    <>
      <div className="rounded-lg bg-dashboard text-white">
        <h2 className="p-4 text-xl">Latest Transactions</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-white rtl:text-right">
            <thead className="border-b bg-dashboard text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Name
                </th>
                <th scope="col" className="py-2 lg:px-6 lg:py-3">
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:block lg:px-6 lg:py-3"
                >
                  Date
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Amount
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3"></th>
              </tr>
            </thead>
            <tbody>
              {listOrders.map((order) => (
                <tr className="bg-dashboard" key={order.id}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-white"
                  >
                    {order.name}
                  </th>
                  <td className="py-4 lg:px-6 lg:py-3">
                    <span
                      className={`rounded-lg p-2 ${order.status === "PENDING" ? "bg-yellow-400" : order.status === "PROCESSING" ? "bg-blue-400" : order.status === "COMPLETED" ? "bg-green-400" : "bg-red-400"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="hidden lg:block lg:px-6 lg:py-3">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-2 lg:px-6 lg:py-3">
                    {order.totalPrice.toLocaleString("vi-VN")}đ
                  </td>
                  <td className={`flex gap-2 px-6 py-4`}>
                    <UpdateStatus order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transactions;
