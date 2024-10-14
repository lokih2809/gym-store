"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import React from "react";
import SizeSelector from "./SelectSize";
import {
  CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_FITS,
  PRODUCT_SIZES,
} from "@/constants/fakeData";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface FormData {
  name: string;
  price: string;
  sku: string;
  color: string;
  fit: string;
  sizes: string[];
  description: string;
  category: string;
}

const AddProduct = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      price: "",
      sku: "",
      color: "",
      fit: "",
      sizes: [],
      description: "",
      category: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          <Input
            label="Name"
            placeholder="Name"
            className="w-2/5"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            label="Price"
            placeholder="Price"
            className="w-2/5"
            name="price"
            register={register}
            error={errors.price?.message}
          />
        </div>
        <div className="flex items-start gap-4">
          <Input
            label="SKU"
            placeholder="SKU"
            className="w-2/5"
            name="sku"
            register={register}
            error={errors.sku?.message}
          />
          <Select
            dataArray={PRODUCT_COLORS}
            name="color"
            register={register}
            label="color"
            className="w-1/6"
          />
          <Select
            dataArray={PRODUCT_FITS}
            name="fit"
            register={register}
            label="fit"
            className="w-1/6"
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            dataArray={CATEGORIES}
            name="category"
            register={register}
            label="loại sản phẩm"
            className="w-2/6"
          />
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <SizeSelector sizes={PRODUCT_SIZES} {...field} />
            )}
          />
        </div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-4/5 rounded-lg border border-gray-200 p-4"
        />
        <Button className="w-1/3" type="submit">
          Add
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
