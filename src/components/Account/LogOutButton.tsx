"use client";

import { clearUser } from "@/app/redux/slices/sessionSlice";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FullscreenLoading from "../common/FullScreenLoading";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setLoading(true);
    dispatch(clearUser());
    signOut({
      redirect: true,
      callbackUrl: "/",
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      {loading && <FullscreenLoading />}
      <span className="cursor-pointer" onClick={handleLogout}>
        Logout
      </span>
    </>
  );
};

export default LogOutButton;
