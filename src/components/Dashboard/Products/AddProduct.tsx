"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { CATEGORIES, PRODUCT_SIZES } from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import SizeSelector from "./SelectSize";
import { createProduct } from "@/lib/actions/productActions";
import InputImages from "../../common/InputImages";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(6, "SKU must have at least 6 characters"),
  category: z.nativeEnum(Category),
  fit: z.string().min(1, "Fit is required"),
  description: z.string().min(1, "Description is required"),
  sizes: z.array(z.string()).optional(),
  color: z.string().min(1, "Color is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
});

type FormValues = z.infer<typeof productSchema>;

const AddNewProduct = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(productSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const thenSuccess = () => {
    setShow(false);
    router.refresh();
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const confirmResult = await confirmWithNotification(
      "Bạn có chắc chắn thêm sản phẩm này?",
    );

    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await createProduct(values);
      showNotification({
        response,
        thenSuccess,
      });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="bg-white px-4 py-2 text-black"
        onClick={() => setShow(true)}
      >
        Add
      </Button>

      {/* Edit form */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="scrollbar-hide absolute z-30 flex max-h-[100vh] min-w-[50%] animate-slide-in-bottom flex-col overflow-y-scroll rounded-lg bg-white p-8 text-black lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Add New Product</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-4">
                  <Input
                    label="Name"
                    placeholder="Name"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                    className="w-1/2"
                  />
                  <Select
                    dataArray={CATEGORIES}
                    name="category"
                    register={register}
                    label="Loại sản phẩm"
                    className="w-1/2"
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    label="Price"
                    placeholder="Price"
                    name="price"
                    register={register}
                    error={errors.price?.message}
                    className="w-1/3"
                  />
                  <Input
                    label="SKU"
                    placeholder="SKU"
                    name="sku"
                    register={register}
                    error={errors.sku?.message}
                    className="w-1/3"
                  />
                  <Input
                    label="Fit"
                    name="fit"
                    register={register}
                    error={errors.fit?.message}
                    className="w-1/3"
                  />
                </div>
                <Controller
                  name="sizes"
                  control={control}
                  render={({ field }) => (
                    <SizeSelector sizes={PRODUCT_SIZES} {...field} />
                  )}
                />
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="mt-4 min-h-40 w-full rounded-lg border border-gray-300 p-4"
                />
                <Input
                  label="Color"
                  name="color"
                  register={register}
                  error={errors.color?.message}
                  className="w-1/2"
                />
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <InputImages
                      label="Chọn ảnh"
                      name="images"
                      type="file"
                      error={errors.images?.message}
                      onChange={field.onChange}
                      isArray
                    />
                  )}
                />
                <Button type="submit" isPrimary>
                  {isLoading ? "Adding..." : "Add"}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewProduct;
