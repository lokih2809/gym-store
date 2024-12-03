"use client";

import { X } from "lucide-react";
import React, { useState } from "react";
import Input from "../common/Input";
import { User } from "next-auth";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import { changePassword, updateUserInfo } from "@/lib/actions/userAction";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearUser, updateUser } from "@/app/redux/slices/sessionSlice";

const EditFormSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  name: z.string().nonempty("Name is required"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  address: z.string().optional().nullable(),
});

const PasswordFormSchema = z
  .object({
    oldPassword: z.string().nonempty("Old Password is required"),
    newPassword: z.string().nonempty("New Password is required"),
    reNewPassword: z.string().nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.reNewPassword, {
    message: "Passwords do not match",
    path: ["reNewPassword"],
  });

type EditFormValues = z.infer<typeof EditFormSchema>;
type PasswordFormValues = z.infer<typeof PasswordFormSchema>;

interface Props {
  userAction: "updateInfo" | "changePassword" | null;
  setUserAction: (action: "updateInfo" | "changePassword" | null) => void;
  user: User | null;
}

const ActionUser = ({ userAction, setUserAction, user }: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const isUpdateInfo = userAction === "updateInfo";
  const formSchema = isUpdateInfo ? EditFormSchema : PasswordFormSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormValues | PasswordFormValues>({
    defaultValues: isUpdateInfo
      ? {
          email: user?.email || "",
          name: user?.name || "",
          phoneNumber: user?.phoneNumber || "",
          address: user?.address || "",
        }
      : {},
    resolver: zodResolver(formSchema),
  });

  const handleFormClose = () => {
    setUserAction(null);
    reset();
  };

  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    }).finally(() => {
      dispatch(clearUser());
    });
  };

  const thenSuccess = (values: any) => {
    if (isUpdateInfo && user) {
      dispatch(updateUser(values));
      setUserAction(null);
    } else if (!isUpdateInfo) {
      handleLogout();
    }
  };

  const onSubmit: SubmitHandler<EditFormValues | PasswordFormValues> = async (
    values,
  ) => {
    const confirmResult = await confirmWithNotification();
    if (!confirmResult.isConfirmed || !user) return;

    try {
      setIsLoading(true);
      const response = isUpdateInfo
        ? await updateUserInfo(+user.id, values as EditFormValues)
        : await changePassword(+user.id, values as PasswordFormValues);

      showNotification({
        response,
        thenSuccess: () => thenSuccess(values),
      });
    } catch (error) {
      catchErrorSystem();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
      <div className="animate-slide-in relative z-30 w-11/12 rounded-lg bg-white py-8 lg:w-1/2">
        <div className="flex justify-between p-4">
          <span className="text-xl font-bold">
            {isUpdateInfo ? "Edit Info" : "Change Password"}
          </span>
          <X onClick={handleFormClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8">
          {isUpdateInfo ? (
            <>
              <Input
                label="Email"
                placeholder="Email"
                name="email"
                register={register}
                disabled
              />
              <Input
                label="Name"
                placeholder="Name"
                name="name"
                register={register}
                error={(errors as FieldErrors<EditFormValues>).name?.message}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                name="phoneNumber"
                register={register}
                error={
                  (errors as FieldErrors<EditFormValues>).phoneNumber?.message
                }
              />
              <Input
                label="Address"
                placeholder="Address"
                name="address"
                register={register}
                error={(errors as FieldErrors<EditFormValues>).address?.message}
              />
            </>
          ) : (
            <>
              <Input
                label="Old Password"
                placeholder="Old Password"
                name="oldPassword"
                register={register}
                error={
                  (errors as FieldErrors<PasswordFormValues>).oldPassword
                    ?.message
                }
                type="password"
              />
              <Input
                label="New Password"
                placeholder="New Password"
                name="newPassword"
                register={register}
                error={
                  (errors as FieldErrors<PasswordFormValues>).newPassword
                    ?.message
                }
                type="password"
              />
              <Input
                label="Confirm New Password"
                placeholder="Confirm New Password"
                name="reNewPassword"
                register={register}
                error={
                  (errors as FieldErrors<PasswordFormValues>).reNewPassword
                    ?.message
                }
                type="password"
              />
            </>
          )}
          <Button type="submit" isPrimary className="w-full">
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ActionUser;
