"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import {
  CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_FITS,
  PRODUCT_SIZES,
} from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, ProductColor } from "@prisma/client";
import { Camera, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import SizeSelector from "./SelectSize";
import InputImages from "./InputImages";
import { createProduct, updateProduct } from "@/lib/actions/productActions";
import { ProductInfo } from "@/types/common";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(8, "SKU must have at least 8 characters"),
  category: z.nativeEnum(Category),
  fit: z.string().min(1, "Fit is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  sizes: z.array(z.string()).optional(),
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

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);

    const response = await createProduct(values);

    try {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.message,
          confirmButtonText: "OK",
        }).then(() => {
          setShow(false);
          router.refresh();
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="font-medium text-blue-500 hover:underline"
        onClick={() => setShow(true)}
      >
        Add
      </button>

      {/* Edit form */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex min-w-[80%] animate-slide-in flex-col rounded-lg bg-white p-8 text-black lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Edit</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-center gap-4">
                  <Input
                    label="Name"
                    placeholder="Name"
                    className="w-1/2"
                    name="name"
                    register={register}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Price"
                    placeholder="Price"
                    className="w-1/2"
                    name="price"
                    register={register}
                    error={errors.price?.message}
                  />
                </div>
                <div className="flex items-start gap-4">
                  <Input
                    label="SKU"
                    placeholder="SKU"
                    className="w-1/2"
                    name="sku"
                    register={register}
                    error={errors.sku?.message}
                  />
                  <div className="flex w-1/2 gap-4">
                    <Select
                      dataArray={PRODUCT_COLORS}
                      name="color"
                      register={register}
                      label="Color"
                      className="w-1/2"
                    />
                    <Input
                      label="Fit"
                      className="w-1/2"
                      name="fit"
                      register={register}
                      error={errors.fit?.message}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    dataArray={CATEGORIES}
                    name="category"
                    register={register}
                    label="Loại sản phẩm"
                    className="w-1/2"
                  />
                  <Controller
                    name="sizes"
                    control={control}
                    render={({ field }) => (
                      <SizeSelector
                        sizes={PRODUCT_SIZES}
                        {...field}
                        className="w-1/2 px-4"
                      />
                    )}
                  />
                </div>
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="mt-4 w-full rounded-lg border border-gray-300 p-4"
                />
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <InputImages
                      icon={<Camera size={60} />}
                      label="Chọn ảnh"
                      name="images"
                      type="file"
                      error={errors.images?.message}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Button className="w-1/3" type="submit">
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewProduct;
