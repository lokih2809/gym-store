"use client";

import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Form = () => {
  const [authMode, setAuthMode] = useState<"login" | "signUp">("login");

  return (
    <>
      <div className="mt-8 flex w-full flex-col gap-8 xl:w-[50%]">
        <div className="mx-auto flex w-[45%] justify-around rounded-full bg-gray-200 py-1 md:w-[35%] lg:w-[30%] xl:w-[45%]">
          <div
            className={`flex rounded-full px-[10%] py-2 ${
              authMode === "login" && "bg-white text-black"
            }`}
            onClick={() => setAuthMode("login")}
          >
            <span className="m-auto cursor-pointer text-sm font-bold uppercase">
              Login
            </span>
          </div>
          <div
            className={`flex rounded-full px-[10%] py-2 ${
              authMode === "signUp" && "bg-white text-black"
            }`}
            onClick={() => setAuthMode("signUp")}
          >
            <span className="cursor-pointer text-sm font-bold uppercase">
              Sign up
            </span>
          </div>
        </div>

        <div className="px-8">
          {authMode === "login" ? (
            <SignInForm />
          ) : (
            <SignUpForm setAuthMode={setAuthMode} />
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
