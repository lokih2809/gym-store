import React, { useState } from "react";
import InputImages from "./InputImages";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import { Camera } from "lucide-react";
import { z } from "zod";
import { addProductColor, updateColor } from "@/lib/actions/productActions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { confirmWithNotification } from "@/utils/utils";
import { ProductColor } from "@prisma/client";

const productColorSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

type FormValues = z.infer<typeof productColorSchema>;

interface Props {
  productId: number;
  colorAction: "create" | "edit" | null;
  setColorAction: (action: "create" | "edit" | null) => void;
  color: ProductColor | null;
  setColor: (color: ProductColor | null) => void;
}

const ColorAction = ({
  productId,
  colorAction,
  setColorAction,
  color,
  setColor,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isCreate = colorAction === "create";
  const buttonText = isCreate ? "Create" : "Edit";

  const methods = useForm<FormValues>({
    defaultValues: isCreate
      ? {}
      : {
          colorName: color?.colorName,
          images: color?.images,
        },
    resolver: zodResolver(productColorSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const confirmResult = await confirmWithNotification();

    if (confirmResult.isConfirmed) {
      isCreate
        ? createColorAction(values)
        : color && editColorAction(color.id, values);
    } else {
      return;
    }
  };

  const createColorAction = async (values: FormValues) => {
    const response = await addProductColor(productId, values);
    try {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.message || "Thêm màu thành công.",
          confirmButtonText: "OK",
        }).then(() => {
          router.refresh();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: response.message || "Something went wrong.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const editColorAction = async (colorId: number, values: FormValues) => {
    const response = await updateColor(colorId, values);
    try {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.message || "Sửa màu thành công.",
          confirmButtonText: "OK",
        }).then(() => {
          router.refresh();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: response.message || "Something went wrong.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const handleClose = () => {
    setColorAction(null);
    setColor(null);
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Color Name"
            name="colorName"
            register={register}
            error={errors.colorName?.message}
            className="w-1/2"
            disabled={!!color}
          />
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <InputImages
                icon={<Camera size={40} />}
                label="Chọn ảnh"
                name="images"
                type="file"
                error={errors.images?.message}
                defaultImages={color?.images || []}
                onChange={(newImages: string[]) => {
                  field.onChange(newImages);
                }}
              />
            )}
          />

          <div className="flex gap-4 py-4">
            <Button type="submit" isPrimary className="px-4">
              {isLoading ? "Processing..." : buttonText}
            </Button>
            <Button className="border bg-gray-200 px-4" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ColorAction;
