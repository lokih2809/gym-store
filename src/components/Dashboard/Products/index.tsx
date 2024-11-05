"use client";

import Button from "@/components/common/Button";
import SearchBoxDashboard from "../SearchBoxDashboard";
import React, { useEffect, useState } from "react";
import {
  formatDate,
  getFilteredAndPaginatedData,
  handleDelete,
} from "@/utils/utils";
import { ProductColor } from "@prisma/client";
import Image from "next/image";
import { Minus, Plus, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ProductInfo } from "@/types/common";
import { deleteProduct } from "@/lib/actions/productActions";
import EditProductColor from "./EditColor";
import AddNewProduct from "./AddProduct";

interface Props {
  listProducts: ProductInfo[];
}

const Products = ({ listProducts }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedColors, setExpandedColors] = useState<{
    [key: number]: boolean;
  }>({});

  const { paginatedData, totalPages, handleNext, handlePrevious } =
    getFilteredAndPaginatedData(listProducts, searchTerm, currentPage, 10, [
      "name",
      "sku",
      "category",
      "fit",
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const nextPage = () => setCurrentPage(handleNext());
  const previousPage = () => setCurrentPage(handlePrevious());

  const toggleColors = (productId: number) => {
    setExpandedColors((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Delete
  const handleDeleteColor = async (colorId: number) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Xác nhận",
      text: "Bạn có thực sự muốn xóa sản phẩm này chứ!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    try {
      const product = listProducts.find((product) =>
        product.colors.some((color) => color.id === colorId),
      );

      if (!product) {
        throw new Error("Product not found");
      }

      if (confirmed.isConfirmed) {
        const remainingColors = product.colors.filter(
          (color) => color.id !== colorId,
        ).length;

        if (remainingColors === 0) {
          await deleteProduct(product.id);
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Xóa màu sản phẩm thành công!",
          confirmButtonText: "OK",
        }).then(() => router.refresh());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Xóa màu thất bại, vui lòng thử lại sau",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="space-y-8 rounded-lg bg-dashboard p-8 text-white">
        {/* Top */}
        <div className="flex items-center justify-between">
          <SearchBoxDashboard
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddNewProduct />
        </div>

        {/* Content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Fit
                </th>
                <th scope="col" className="px-6 py-3">
                  CreatedAt
                </th>
                <th scope="col" className="px-6 py-3">
                  More
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((product: ProductInfo) => (
                <React.Fragment key={product.id}>
                  <tr
                    className={`border-b text-white ${expandedColors[product.id + 1]} && border-t`}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.fit}</td>
                    <td className="px-6 py-4">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleColors(product.id)}
                        className="ml-2"
                      >
                        {expandedColors[product.id] ? <Minus /> : <Plus />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          handleDelete(product.id, "product", router)
                        }
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                  {expandedColors[product.id] && (
                    <tr>
                      <td colSpan={10}>
                        <table className="mb-40 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                          <thead className="text-xs uppercase text-white">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                ID Color
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Name Color
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Image
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {product.colors.map((color: ProductColor) => (
                              <tr key={color.id} className={`border-b`}>
                                <td className="py-4 pl-6">{color.id}</td>
                                <td className="px-6 py-4 font-bold">
                                  {color.colorName}
                                </td>
                                <td className="px-6 py-4">
                                  {color.images.length > 0 && (
                                    <Image
                                      src={color.images[0]}
                                      width={100}
                                      height={120}
                                      alt={color.colorName}
                                      className="h-24 w-16 object-cover"
                                    />
                                  )}
                                </td>
                                <td className="flex gap-2 px-6 py-12">
                                  <EditProductColor
                                    product={product}
                                    color={color}
                                  />
                                  <span>|</span>
                                  <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDeleteColor(color.id)}
                                  >
                                    delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <div className="flex justify-center py-4">
                            <span className="flex cursor-pointer items-center gap-4 text-blue-500 hover:underline">
                              Thêm màu
                              <PlusCircle />
                            </span>
                          </div>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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

export default Products;
