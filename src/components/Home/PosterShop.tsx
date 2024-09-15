import Image from "next/image";
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
    <div className="flex w-full flex-col items-center justify-between gap-4 px-4 lg:flex-row lg:px-8 xl:px-12">
      {data.map((item) => (
        <div key={item.name} className="relative h-[80vh] w-full md:w-[33vw]">
          <Image
            src={item.poster}
            alt=""
            fill
            className="rounded-md object-cover"
          />
          <button className="absolute bottom-4 left-4 rounded-full bg-white px-6 py-3 font-bold uppercase">
            Shop {item.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PosterShop;
