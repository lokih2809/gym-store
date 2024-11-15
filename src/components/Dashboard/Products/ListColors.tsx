"use client";

import { ProductColor } from "@prisma/client";
import Image from "next/image";
import { deleteProductColor } from "@/lib/actions/productActions";
import { useRouter } from "next/navigation";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { useState } from "react";
import Button from "@/components/common/Button";
import ColorAction from "./ColorAction";

interface Props {
  colors: ProductColor[];
  productId: number;
}

const ListColors = ({ colors, productId }: Props) => {
  const router = useRouter();
  const [colorAction, setColorAction] = useState<"create" | "edit" | null>(
    null,
  );
  const [color, setColor] = useState<ProductColor | null>(null);

  const handleEdit = (color: ProductColor) => {
    setColor(color);
    setColorAction("edit");
  };

  const handleDeleteProductColor = async (id: number) => {
    const confirmResult = await confirmWithNotification(
      "Bạn có chắc chắn xóa màu này?",
    );

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await deleteProductColor(id);
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
      <div className="flex flex-1 flex-col items-center gap-4 py-4">
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
                    className="flex max-w-[40vw] flex-wrap gap-4 overflow-x-hidden px-1 py-2 font-medium lg:px-6 lg:py-4"
                  >
                    {color.images.map((image) => (
                      <div className="relative h-20 w-14" key={image}>
                        <Image
                          fill
                          src={image}
                          alt=""
                          sizes="15vw"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </th>
                  <td className="p-2 font-bold lg:px-6 lg:py-3">
                    {color.colorName}
                  </td>
                  <td className="min-w-40 space-x-4 px-6 py-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(color)}
                    >
                      Edit
                    </button>
                    <span>|</span>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteProductColor(color.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!colorAction && (
          <Button
            isPrimary
            className="w-1/2 px-4"
            onClick={() => setColorAction("create")}
          >
            Add New Color
          </Button>
        )}

        {colorAction && (
          <ColorAction
            productId={productId}
            colorAction={colorAction}
            setColorAction={setColorAction}
            color={color}
            setColor={setColor}
          />
        )}
      </div>
    </>
  );
};

export default ListColors;
