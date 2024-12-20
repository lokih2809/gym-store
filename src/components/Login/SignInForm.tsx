import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slices/sessionSlice";
import { catchErrorSystem } from "@/utils/utils";

const FormSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormValues = z.infer<typeof FormSchema>;

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setErrorMessage(null);
      setIsLoading(true);

      const signInData = await signIn("credentials", {
        redirect: false,
        identifier: values.identifier,
        password: values.password,
      });

      if (signInData?.ok) {
        const session = await getSession();
        if (session?.user) {
          dispatch(setUser(session.user));
        }
        router.push("/");
      } else {
        setErrorMessage("Invalid account or password. Please check again.");
      }
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
          label="Email address"
          name="identifier"
          register={register}
          error={errors.identifier?.message}
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
        <Button type="submit" disabled={isLoading} isPrimary>
          {isLoading ? "Loading ..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
