"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { adminUpdateUser } from "@/lib/actions/authActions";
import { UserWithoutPassword } from "@/types/common";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required").max(100),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  address: z.string().optional().nullable(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});

interface Props {
  user: UserWithoutPassword;
}

type FormValues = z.infer<typeof FormSchema>;

const EditAccountForm = ({ user }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues: {
      email: user.email || "",
      username: user.username || "",
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      role: user.role || "CUSTOMER",
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const thenSuccess = () => {
    setShow(false);
    router.refresh();
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value || "");
    }

    const confirmResult = await confirmWithNotification();
    if (!confirmResult.isConfirmed) return;

    try {
      setIsLoading(true);
      const response = await adminUpdateUser(user.id, formData);
      showNotification({ response, thenSuccess });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <button
        className="text-blue-500 hover:underline"
        onClick={() => setShow(true)}
      >
        Edit
      </button>

      {/* Edit box */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex w-11/12 animate-slide-in-bottom flex-col rounded-lg bg-white py-8 text-black lg:animate-slide-in-right xl:w-1/2">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Edit</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>

            <form className="space-y-8 px-8" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email?.message}
                disabled
              />
              <Input
                label="Username"
                placeholder="Username"
                name="username"
                register={register}
                error={errors.username?.message}
                disabled
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
                {isLoading ? "Editing..." : "Edit"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAccountForm;
