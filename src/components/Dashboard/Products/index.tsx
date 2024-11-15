"use client";

import Button from "@/components/common/Button";
import SearchBoxDashboard from "../SearchBoxDashboard";
import React, { useEffect, useState } from "react";
import {
  catchErrorSystem,
  confirmWithNotification,
  formatDate,
  getFilteredAndPaginatedData,
  showNotification,
} from "@/utils/utils";
import { useRouter } from "next/navigation";
import { ProductInfo } from "@/types/common";
import AddNewProduct from "./AddProduct";
import MoreOption from "./MoreOption";
import { deleteProduct } from "@/lib/actions/productActions";

interface Props {
  listProducts: ProductInfo[];
}

const Products = ({ listProducts }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleDelete = async (id: number) => {
    const confirmResult = await confirmWithNotification(
      "Bạn có chắc chắn xóa sản phẩm này?",
    );
    if (!confirmResult.isConfirmed) return;

    try {
      const response = await deleteProduct(id);
      showNotification({
        response,
        thenSuccess() {
          router.refresh();
        },
      });
    } catch (error) {
      catchErrorSystem();
    }
  };

  return (
    <>
      <div className="bg-dashboard space-y-8 rounded-lg p-8 text-white">
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
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Colors
                </th>
                <th scope="col" className="px-6 py-3">
                  CreatedAt
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((product: ProductInfo) => (
                <React.Fragment key={product.id}>
                  <tr className={`border-b text-white`}>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 truncate">
                        {product.colors.map((color, index) => (
                          <div key={color.id} className="flex">
                            <p>{color.colorName}</p>
                            {product.colors.length - 1 > index && <p>, </p>}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="flex gap-2 px-6 py-4">
                      <MoreOption product={product} />
                      <span>|</span>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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
