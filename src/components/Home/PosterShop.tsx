import { COLLECTIONS_LINK } from "@/constants/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LinkProduct = {
  name: string;
  images: string[];
  poster: string;
};

type Props = {
  data: LinkProduct[];
};

const PosterShop = ({ data }: Props) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-4 px-4 py-8 lg:flex-row lg:px-8 xl:px-12">
        {data.map((item) => (
          <div key={item.name} className="relative h-[80vh] w-full md:w-[33vw]">
            <Image
              src={item.poster}
              alt=""
              fill
              sizes="1000"
              className="rounded-md object-cover"
            />
            <Link href={`${COLLECTIONS_LINK}/${item.name.replace("'s", "")}`}>
              <button className="absolute bottom-4 left-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase lg:left-4">
                Shop {item.name}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PosterShop;
