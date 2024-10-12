"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogOutButton = () => {
  return (
    <>
      <span
        className="cursor-pointer font-bold underline"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: "/",
          })
        }
      >
        Log out
      </span>
    </>
  );
};

export default LogOutButton;
