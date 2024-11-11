import React, { useState } from "react";
import InputImages from "./InputImages";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import { Camera } from "lucide-react";
import { z } from "zod";
import { addProductColor } from "@/lib/actions/productActions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { confirmWithNotification } from "@/utils/utils";

const productColorSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

type FormValues = z.infer<typeof productColorSchema>;

interface Props {
  productId: number;
}

const AddColor = ({ productId }: Props) => {
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<FormValues>({
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
      const response = await addProductColor(productId, values);
      try {
        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: response.message || "Thêm màu thành công.",
            confirmButtonText: "OK",
          }).then(() => {
            setShow(false);
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
    } else {
      return;
    }
  };

  return (
    <>
      {!show && (
        <Button isPrimary className="w-1/2 px-4" onClick={() => setShow(true)}>
          Add New Color
        </Button>
      )}

      {show && (
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Color Name"
              name="colorName"
              register={register}
              error={errors.colorName?.message}
              className="w-1/2"
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
                  onChange={(newImages: string[]) => {
                    field.onChange(newImages);
                  }}
                />
              )}
            />

            <div className="flex gap-4 py-4">
              <Button type="submit" isPrimary className="px-4">
                {isLoading ? "Updating..." : "Update"}
              </Button>
              <Button
                className="border bg-gray-200 px-4"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddColor;
