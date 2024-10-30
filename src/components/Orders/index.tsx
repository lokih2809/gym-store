import { OrderItemWithProduct, OrderWithProduct } from "@/types/common";
import React from "react";

type Props = {
  order: OrderWithProduct;
};

const OrderDetail = ({ order }: Props) => {
  return (
    <>
      <div className="flex w-full flex-col gap-4 py-8 lg:flex-row">
        <div className="flex flex-col gap-4 border-r px-8">
          <span className="font-bold">Thông tin đặt hàng</span>
          <span>Số điện thoại: {order.phoneNumber}</span>
          <span>Địa chỉ: {order.addressOrder}</span>
          <span>
            Giá trị đơn hàng: {order.totalPrice.toLocaleString("vi-VN")}đ
          </span>
          <span>Trạng thái đơn hàng: {order.status}</span>
        </div>

        <div className="mt-4 px-8 lg:mt-0 lg:w-4/5 lg:px-0">
          <span className="font-bold">Danh sách sản phẩm</span>
          <table className="mt-4 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="border-b text-xs uppercase text-black">
              <tr>
                <th scope="col" className="pr-4 lg:px-12 lg:py-3">
                  Name product
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Color
                </th>
                <th scope="col" className="px-8 lg:py-3">
                  Size
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map(
                (item: OrderItemWithProduct, index: number) => {
                  return (
                    <tr className={`border-b text-black`} key={item.id}>
                      <th
                        scope="row"
                        className="max-w-24 truncate whitespace-nowrap pr-4 font-bold lg:px-12 lg:py-3"
                      >
                        {item.product.name}
                      </th>
                      <td className="px-4 py-2 lg:px-6 lg:py-3">
                        {item.color || "No color"}
                      </td>
                      <td className="pl-8 lg:px-6 lg:py-3">
                        {item.size || "No size"}
                      </td>
                      <td className="px-4 py-2 lg:px-6 lg:py-3">
                        ${item.product.price}
                      </td>
                    </tr>
                  );
                },
              )}
              <tr className="text-black">
                <th
                  scope="row"
                  className="max-w-24 truncate whitespace-nowrap px-12 py-4 font-medium"
                ></th>
                <td className={`px-6 py-4`}></td>
                <td className="py-2 font-bold lg:px-6 lg:py-3">
                  Tổng giá trị:
                </td>
                <td className="px-4 py-2 text-lg font-bold lg:px-6 lg:py-3">
                  {order.totalPrice.toLocaleString("vi-VN")}đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
