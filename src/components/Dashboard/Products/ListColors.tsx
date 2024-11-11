"use client";

import { ProductColor } from "@prisma/client";
import Image from "next/image";
import { deleteColor } from "@/lib/actions/productActions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AddColor from "./AddColor";
import { confirmWithNotification } from "@/utils/utils";

interface Props {
  colors: ProductColor[];
  productId: number;
}

const ListColors = ({ colors, productId }: Props) => {
  const router = useRouter();

  const handleDeleteColor = async (id: number) => {
    const confirmResult = await confirmWithNotification(
      "Are you sure you want to delete?",
    );

    if (confirmResult.isConfirmed) {
      const response = await deleteColor(id);
      try {
        if (response.status === "success") {
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item was deleted successfully",
            confirmButtonText: "Ok",
          }).then(() => {
            router.refresh();
          });
        } else {
          throw new Error("Deletion failed");
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was a problem deleting the item",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col items-center gap-4">
        <span className="mr-auto py-2 text-lg font-bold">Colors</span>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="border-b text-xs uppercase text-black">
              <tr>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3"></th>
                <th scope="col" className="p-2 lg:px-6 lg:py-3">
                  Color Name
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr className="border-b text-black" key={color.id}>
                  <th
                    scope="row"
                    className="flex gap-4 overflow-x-hidden px-4 py-2 font-medium lg:px-6 lg:py-4"
                  >
                    {color.images.map((image) => (
                      <div className="relative h-20 w-16" key={image}>
                        <Image
                          fill
                          src={image}
                          alt=""
                          className="object-contain"
                          sizes="w-64px w-80px"
                        />
                      </div>
                    ))}
                  </th>
                  <td className="p-2 font-bold lg:px-6 lg:py-3">
                    {color.colorName}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteColor(color.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddColor productId={productId} />
      </div>
    </>
  );
};

export default ListColors;
