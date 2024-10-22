"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { editUser } from "@/lib/actions/authActions";
import { UserWithoutPassword } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required").max(100),
  name: z.string().min(1, "Name is required"),
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

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value || "");
    }

    const response = await editUser(user.id, formData);

    setIsLoading(false);
    if (response.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: response.message || "Tạo tài khoản người dùng thành công.",
        confirmButtonText: "OK",
      }).then(() => {
        setShow(false);
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: response.message || "Có lỗi xảy ra ! vui lòng thử lại sau",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClose = () => {};

  return (
    <div>
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
          <div className="absolute z-30 flex w-1/2 animate-slide-in flex-col rounded-lg bg-white py-8 text-black lg:animate-slide-in-right">
            <div className="flex justify-center p-4">
              <span className="m-auto text-xl font-bold">Create</span>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
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
                {isLoading ? "Editing..." : "Edit"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAccountForm;
