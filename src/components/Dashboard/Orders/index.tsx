"use client";

import React, { useState } from "react";
import SearchBoxDashboard from "../SearchBoxDashboard";
import { formatDate, getFilteredAndPaginatedData } from "@/utils/utils";
import Button from "@/components/common/Button";
import { OrderWithUser } from "@/types/common";
import UpdateStatus from "./UpdateStatus";

interface Props {
  listOrders: OrderWithUser[];
}

const Orders = ({ listOrders }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { paginatedData, totalPages, handleNext, handlePrevious } =
    getFilteredAndPaginatedData(listOrders, searchTerm, currentPage, 10, [
      "status",
      "paymentStatus",
      "paymentMethod",
    ]);

  const nextPage = () => setCurrentPage(handleNext());
  const previousPage = () => setCurrentPage(handlePrevious());

  return (
    <>
      <div className="bg-dashboard relative space-y-8 rounded-lg text-white">
        {/* Top */}
        <div className="flex items-center justify-between">
          <SearchBoxDashboard
            placeholder="Search for a order"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User Mail
                </th>

                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                  Total Price
                </th>
                <th scope="col" className="hidden px-6 py-3 xl:table-cell">
                  Payment Method
                </th>
                <th scope="col" className="hidden px-6 py-3 xl:table-cell">
                  Payment Status
                </th>
                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                  Transaction
                </th>
                <th scope="col" className="hidden px-6 py-3 xl:table-cell">
                  Created At
                </th>

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((order: OrderWithUser) => (
                <tr className="border-b text-white" key={order.id}>
                  <th
                    scope="row"
                    className={`max-w-40 whitespace-nowrap px-6 py-4 font-medium`}
                  >
                    {order.user.email}
                  </th>
                  <td className="hidden px-6 py-3 md:table-cell">
                    {order.totalPrice.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="hidden px-6 py-3 xl:table-cell">
                    {order.paymentMethod}
                  </td>
                  <td className="hidden px-6 py-4 xl:table-cell">
                    <span
                      className={`rounded-lg p-2 ${order.paymentStatus === "PENDING" ? "bg-yellow-400" : order.paymentStatus === "PAID" ? "bg-green-400" : "bg-red-400"}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className={`hidden px-6 py-3 md:table-cell`}>
                    {order.transactionId}
                  </td>
                  <td className="hidden px-6 py-4 xl:table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-lg p-2 ${order.status === "PENDING" ? "bg-yellow-400" : order.status === "PROCESSING" ? "bg-blue-400" : order.status === "COMPLETED" ? "bg-green-400" : "bg-red-400"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className={`flex gap-2 px-6 py-4`}>
                    <UpdateStatus order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <Button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            Previous
          </Button>
          <small>{currentPage}</small>
          <Button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Orders;
