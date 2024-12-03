import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import Button from "../common/Button";
import { createUser } from "@/lib/actions/authActions";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";

const FormSchema = z
  .object({
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
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    const confirmResult = await confirmWithNotification();
    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await createUser(values);
      showNotification({
        response,
        thenSuccess() {
          setAuthMode("login");
        },
      });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
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
        <Button type="submit" isPrimary>
          {isLoading ? "Creating..." : "Create account"}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
