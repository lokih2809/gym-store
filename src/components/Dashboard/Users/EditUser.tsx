"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { updateUser } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required").max(100),
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  user: Omit<User, "password">;
}

const EditUser = ({ user }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue("email", user.email);
    setValue("username", user.username);
    setValue("name", user.name);
    setValue("address", user.address);
    setValue("role", user.role);
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    try {
      const response = await updateUser(user.id, formData);
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật người dùng thành công !",
        confirmButtonText: "OK",
      }).then(() => {
        setShow(false);
        router.refresh();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Cập nhật thất bại.",
        confirmButtonText: "OK",
      }).then(() => {
        setShow(false);
        router.refresh();
      });
    }
  };

  return (
    <div>
      {/* Button */}
      <button
        className="font-medium text-blue-500 hover:underline"
        onClick={() => setShow(true)}
      >
        Edit
      </button>

      {/* Edit box */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex h-2/3 w-1/2 animate-slide-in flex-col rounded-lg bg-white text-black lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Edit</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="name"
                name="name"
                register={register}
                error={errors.name?.message}
              />
              <Input
                label="username"
                name="username"
                register={register}
                error={errors.username?.message}
              />
              <Input
                label="email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <Input
                label="address"
                name="address"
                placeholder="hãy nhập địa chỉ"
                error={errors.address?.message}
              />
              <Select
                dataArray={["CUSTOMER", "ADMIN"]}
                label="Loại tài khoản"
                name="role"
                register={register}
                className="w-2/5"
              />
              <Button type="submit" className="mt-8 w-1/2">
                Edit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
