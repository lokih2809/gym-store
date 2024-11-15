import React, { useState } from "react";
import InputImages from "../../common/InputImages";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import { z } from "zod";
import {
  addProductColor,
  updateProductColor,
} from "@/lib/actions/productActions";
import { useRouter } from "next/navigation";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
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
    const confirmResult = await confirmWithNotification(
      isCreate
        ? "Bạn có chắc chắn muốn thêm màu này?"
        : "Bạn có chắc chắn muốn cập nhật màu này?",
    );
    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = isCreate
        ? await addProductColor(productId, values)
        : color && (await updateProductColor(color?.id, values));
      response &&
        showNotification({
          response,
          thenSuccess,
        });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const thenSuccess = () => {
    router.refresh();
    setColorAction(null);
  };

  const handleClose = () => {
    setColorAction(null);
    setColor(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
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
              label="Chọn ảnh"
              name="images"
              type="file"
              isArray={true}
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
    </>
  );
};

export default ColorAction;
