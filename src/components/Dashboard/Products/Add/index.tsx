"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import React, { useState } from "react";
import SizeSelector from "./SelectSize";
import {
  CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_FITS,
  PRODUCT_SIZES,
} from "@/constants/fakeData";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import InputImages from "./InputImages";
import { Camera } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions";
import Swal from "sweetalert2";

const FormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(8, "SKU must have at least 8 characters"),
  category: z.nativeEnum(Category),
  fit: z.string(),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
});
type FormValues = z.infer<typeof FormSchema>;

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const transformedData = {
      ...data,
      price: parseFloat(data.price),
    };
    try {
      setIsLoading(true);
      const response = await createProduct(transformedData);
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.message,
          confirmButtonText: "OK",
        }).then(() => {
          setIsLoading(true);
          router.push("/dashboard/products");
          router.refresh();
        });
      }
    } catch (error) {}
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
              label="color"
              className="w-1/2"
            />
            <Select
              dataArray={PRODUCT_FITS}
              name="fit"
              register={register}
              label="fit"
              className="w-1/2"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select
            dataArray={CATEGORIES}
            name="category"
            register={register}
            label="loại sản phẩm"
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
              icon={<Camera size={100} />}
              label="Chọn ảnh"
              name="images"
              type="file"
              error={errors.images?.message}
              onChange={field.onChange}
            />
          )}
        />
        <Button className="w-1/3" type="submit">
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
