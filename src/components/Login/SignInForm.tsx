import React, { useState } from "react";
import Input from "./Input";
import Button from "../common/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormValues = z.infer<typeof FormSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    const signInData = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      console.error("Failed to sign in:", signInData.error);
      setErrorMessage(
        "Tài khoản hoặc mật khẩu không hợp lệ vui lòng kiểm tra lại",
      );
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/account");
    }
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email address"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        {errorMessage && <small className="text-red-500">{errorMessage}</small>}

        <span className="text-center font-bold underline">
          Forgot password?
        </span>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading ..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
