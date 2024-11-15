import Image from "next/image";
import Link from "next/link";
import React from "react";
import Form from "./Form";

const Login = () => {
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Left */}
        <div className="hidden h-full overflow-hidden xl:block">
          <Image
            src={"/auth-img.jpg"}
            alt=""
            width={0}
            height={0}
            sizes="50vw"
            className="h-auto w-[50vw] object-cover"
          />
        </div>

        {/* Right */}
        <div className="flex flex-grow flex-col items-center justify-center">
          <Link href={"/"} className="flex flex-col items-center gap-4">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={45}
              height={40}
              className="object-cover"
            />
            <b className="text-xl uppercase">My Gym</b>
          </Link>
          <Form />
        </div>
      </div>
    </>
  );
};

export default Login;
