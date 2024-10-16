import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import Button from "../common/Button";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

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
        text: "Đăng ký tài khoản thành công, vui lòng đăng nhập",
        confirmButtonText: "OK",
      }).then(() => {
        setAuthMode("login");
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
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your name"
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <Input
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />
        <Input
          label="Email address"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit">
          {isLoading ? "Creating..." : "Create account"}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
