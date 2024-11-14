"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { CATEGORIES, PRODUCT_SIZES } from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import SizeSelector from "./SelectSize";
import { ProductInfo } from "@/types/common";
import { useState } from "react";
import ListColors from "./ListColors";
import { updateProduct } from "@/lib/actions/productActions";
import { useRouter } from "next/navigation";
import { confirmWithNotification } from "@/utils/utils";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().min(6, "SKU must have at least 6 characters"),
  category: z.nativeEnum(Category),
  fit: z.string().min(1, "Fit is required"),
  description: z.string().min(1, "Description is required"),
  sizes: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof productSchema>;

interface Props {
  product: ProductInfo;
}

const MoreOption = ({ product }: Props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price.toString(),
      sku: product.sku,
      category: product.category,
      fit: product.fit,
      description: product.description,
      sizes: product.productSizes.map((size) => size.size),
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const confirmResult = await confirmWithNotification();

    if (confirmResult.isConfirmed) {
      setIsLoading(true);
      const response = await updateProduct(product.id, values);
      try {
        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: response.message || "Sửa sản phẩm thành công",
            confirmButtonText: "OK",
          }).then(() => {
            setShow(false);
            router.refresh();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: response.message || "Cập nhật thất bại",
            confirmButtonText: "OK",
          }).then(() => {
            setShow(false);
            router.refresh();
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <button
        className="font-medium text-blue-500 hover:underline"
        onClick={() => setShow(true)}
      >
        Edit
      </button>

      {/* Edit form */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="scrollbar-hide absolute z-30 flex h-[90%] w-[90%] animate-slide-in-bottom flex-col overflow-y-scroll rounded-lg bg-white px-4 text-black lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">More</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <div className="flex gap-8">
              <FormProvider {...methods}>
                <form
                  className="flex w-1/2 flex-col gap-4"
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
                  <div className="">
                    <label className="font-bold">Description</label>
                    <textarea
                      {...register("description")}
                      placeholder="Description"
                      className="mt-4 min-h-60 w-full rounded-lg border border-gray-300 p-4"
                    />
                  </div>
                  <Button type="submit" isPrimary>
                    {isLoading ? "Uploading..." : "Upload"}
                  </Button>
                </form>
              </FormProvider>

              <div className="min-h-[80vh] w-1 bg-gray-200"></div>

              <ListColors colors={product.colors} productId={product.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreOption;
