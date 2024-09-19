"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "../common/Button";

const Form = () => {
  const [authMode, setAuthMode] = useState<"login" | "sign up">("login");
  return (
    <>
      <div className="mt-8 flex w-full flex-col gap-8 lg:w-[50%]">
        {/* Top */}
        <div className="mx-auto flex w-[45%] justify-around rounded-full bg-gray-200 py-1">
          <div
            className={`flex rounded-full px-[10%] py-2 ${authMode === "login" && "bg-white text-black"}`}
            onClick={() => setAuthMode("login")}
          >
            <span className={`m-auto text-sm font-bold uppercase`}>Login</span>
          </div>
          <div
            className={`flex rounded-full px-[10%] py-2 ${authMode === "sign up" && "bg-white text-black"}`}
            onClick={() => setAuthMode("sign up")}
          >
            <span className={`text-sm font-bold uppercase`}>Sign up</span>
          </div>
        </div>

        <div className="px-8">
          {authMode === "login" ? (
            <form className="flex flex-col gap-6">
              <Input label="email address" />
              <Input label="password" type="password" />
              <span className="text-center font-bold underline">
                Forgot password?
              </span>
              <Button className="">Login</Button>
            </form>
          ) : (
            <form className="flex flex-col gap-6 xl:animate-slide-in">
              <Input label="first name" />
              <Input label="last name" />
              <Input
                label="date of birth"
                type="date"
                placeholder="select date"
              />
              <Input label="email address" />
              <Input label="password" type="password" />
              <Button className="">Create account</Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
