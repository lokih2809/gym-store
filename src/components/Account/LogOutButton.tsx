"use client";

import { clearUser } from "@/app/redux/slices/sessionSlice";
import { signOut } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <>
      <span
        className="cursor-pointer font-bold underline"
        onClick={handleLogout}
      >
        Log out
      </span>
    </>
  );
};

export default LogOutButton;
