import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { createUser } from "@/lib/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  name: z.string().min(1, "Name is required"),
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

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    setIsLoading(true);

    const response = await createUser(values);

    setIsLoading(false);
    if (response.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: response.message || "Tạo tài khoản người dùng thành công.",
        confirmButtonText: "OK",
      }).then(() => {
        setShow(false);
        reset();
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: response.message || "Có lỗi xảy ra! Vui lòng thử lại sau.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    reset();
  };

  return (
    <div>
      {/* Button */}
      <Button className="px-4 py-2" onClick={() => setShow(true)}>
        Create Account
      </Button>

      {/* Edit box */}
      {show && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
          <div className="absolute z-30 flex w-1/2 animate-slide-in flex-col rounded-lg bg-white py-8 text-black lg:animate-slide-in-right">
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
              <Button className="w-full" type="submit">
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccountForm;
