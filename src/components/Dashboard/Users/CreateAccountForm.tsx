import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { createUser } from "@/lib/actions/authActions";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  address: z.string().nullable(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

type FormValues = z.infer<typeof userSchema>;

const CreateAccountForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const methods = useForm<FormValues>({ resolver: zodResolver(userSchema) });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const thenSuccess = () => {
    setShow(false);
    router.refresh();
    reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    const confirmResult = await confirmWithNotification();
    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await createUser(values);
      showNotification({ response, thenSuccess });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  return (
    <>
      {/* Button */}
      <Button
        className="bg-white px-2 py-1 text-xs text-black lg:px-4 lg:py-2 lg:text-sm"
        onClick={() => setShow(true)}
      >
        Create Account
      </Button>

      {/* Edit box */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex w-11/12 animate-slide-in-bottom flex-col rounded-lg bg-white py-8 text-black xl:w-1/2 xl:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Create</span>
              <X onClick={handleClose} className="cursor-pointer" />
            </div>

            <form className="space-y-8 px-8" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <Input
                label="Username"
                placeholder="Username"
                name="username"
                register={register}
                error={errors.username?.message}
              />
              <Input
                label="Password"
                placeholder="Password"
                name="password"
                register={register}
                error={errors.password?.message}
                type="password"
              />
              <Input
                label="Name"
                placeholder="Name"
                name="name"
                register={register}
                error={errors.name?.message}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber?.message}
              />
              <Input
                label="Address"
                placeholder="Address"
                name="address"
                register={register}
                error={errors.address?.message}
              />
              <Select
                dataArray={["CUSTOMER", "ADMIN"]}
                label="Loại tài khoản"
                name="role"
                register={register}
              />
              <Button className="w-full" type="submit" isPrimary>
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccountForm;
