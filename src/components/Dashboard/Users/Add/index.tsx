"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required").max(100),
  password: z.string().min(8, "Password must have more than 8 characters"),
  name: z.string().min(1, "Name is required"),
  address: z.string(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

type FormValues = z.infer<typeof FormSchema>;

const AddUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Tạo tài khoản người dùng thành công.",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/dashboard/users");
        router.refresh();
      });
    } else {
      const { message } = await response.json();
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8">
          <Input
            label="Email"
            placeholder="Email"
            className="w-1/2"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            label="Username"
            placeholder="Username"
            className="w-1/2"
            name="username"
            register={register}
            error={errors.username?.message}
          />
        </div>
        <div className="flex gap-8">
          <Input
            label="Password"
            placeholder="Password"
            className="w-1/2"
            name="password"
            register={register}
            error={errors.password?.message}
            type="password"
          />
          <Input
            label="Name"
            placeholder="Name"
            className="w-1/2"
            name="name"
            register={register}
            error={errors.name?.message}
          />
        </div>
        <div className="flex items-start gap-8">
          <Input
            label="Address"
            placeholder="Address"
            className="w-1/2"
            name="address"
            register={register}
            error={errors.address?.message}
          />
          <Select
            dataArray={["CUSTOMER", "ADMIN"]}
            label="Loại tài khoản"
            name="role"
            register={register}
            className="w-1/2"
          />
        </div>
        <Button className="w-1/5" type="submit">
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </form>
    </>
  );
};

export default AddUser;
