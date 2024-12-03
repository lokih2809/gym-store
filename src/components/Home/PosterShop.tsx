"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type LinkProduct = {
  name: string;
  image: string;
  poster: string;
  link: string;
};

interface Props {
  data: LinkProduct[];
}

const PosterShop = ({ data }: Props) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-4 px-2 py-8 md:px-4 lg:px-6 xl:flex-row xl:px-8">
        {data.map((item) => (
          <div key={item.name} className="relative">
            <Image
              src={item.poster}
              alt=""
              width={0}
              height={0}
              sizes="33vw"
              className="h-auto w-[100vw] rounded-md object-cover xl:w-[33vw]"
            />
            <Link
              href={item.link}
              className="absolute bottom-4 right-2 rounded-full bg-white px-4 py-2 font-bold uppercase opacity-80"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PosterShop;
