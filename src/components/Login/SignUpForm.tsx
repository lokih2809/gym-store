import React from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    name: z.string().min(1, "Name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof FormSchema>;

interface Props {
  setAuthMode: (mode: "login" | "signUp") => void;
}

const SignUpForm = ({ setAuthMode }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đăng ký tài khoản thành công, vui lòng đăng nhập",
        confirmButtonText: "OK",
      }).then(() => {
        setAuthMode("login");
      });
    } else {
      const { message } = await response.json(); // Lấy thông điệp từ phản hồi
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: message, // Hiển thị thông báo lỗi từ server
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your name"
          name="name"
          register={register}
          error={errors.name?.message}
          value={watch("name")}
        />
        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
          value={watch("username")}
        />
        <Input
          label="Email address"
          name="email"
          register={register}
          error={errors.email?.message}
          value={watch("email")}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
          value={watch("password")}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
          value={watch("password")}
        />
        <Button type="submit">Create account</Button>
      </form>
    </>
  );
};

export default SignUpForm;
