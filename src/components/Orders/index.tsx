import { OrderItemWithProduct, OrderWithProduct } from "@/types/common";
import React from "react";

interface Props {
  order: OrderWithProduct;
}

const OrderDetail = ({ order }: Props) => {
  return (
    <>
      <div className="flex w-full flex-col gap-4 py-8 xl:flex-row">
        <div className="flex flex-col gap-4 border-r px-8">
          <span className="font-bold">Thông tin đặt hàng</span>
          <span>Số điện thoại: {order.phoneNumber}</span>
          <span>Địa chỉ: {order.addressOrder}</span>
          <span>
            Giá trị đơn hàng: {order.totalPrice.toLocaleString("vi-VN")}đ
          </span>
          <span>Trạng thái đơn hàng: {order.status}</span>
        </div>
        <hr className="xl:hidden" />

        <div className="mt-4 px-2 md:px-8 xl:mt-0 xl:w-4/5 xl:px-0">
          <span className="font-bold">Danh sách sản phẩm</span>
          <table className="mt-4 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="border-b text-xs uppercase text-black">
              <tr>
                <th scope="col" className="py-4 pr-2 xl:px-12 xl:py-3">
                  Name product
                </th>
                <th scope="col" className="px-4 xl:px-6 xl:py-3">
                  Color
                </th>
                <th scope="col" className="px-8 xl:px-6 xl:py-3">
                  Size
                </th>
                <th scope="col" className="px-4 xl:px-6 xl:py-3">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item: OrderItemWithProduct) => {
                return (
                  <tr className={`border-b text-black`} key={item.id}>
                    <th
                      scope="row"
                      className="max-w-32 truncate whitespace-nowrap pr-4 font-bold xl:px-12 xl:py-3"
                    >
                      {item.product.name}
                    </th>
                    <td className="px-4 py-2 xl:px-6 xl:py-3">
                      {item.color || "No color"}
                    </td>
                    <td className="pl-8 xl:px-6 xl:py-3">
                      {item.size || "No size"}
                    </td>
                    <td className="px-4 py-2 xl:px-6 xl:py-3">
                      ${item.product.price}
                    </td>
                  </tr>
                );
              })}
              <tr className="text-black">
                <td className="pl-8 xl:px-6 xl:py-3"></td>
                <td className="pl-8 xl:px-6 xl:py-3"></td>

                <td className="py-4 font-bold xl:px-6 xl:py-3">
                  Tổng giá trị:
                </td>
                <td className="py-4 font-bold xl:px-6 xl:py-3 xl:text-xl">
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
