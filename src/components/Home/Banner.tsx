import { COLLECTIONS_LINK } from "@/constants/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const categoryOfBanner = ["men", "women"];

const Banner = () => {
  return (
    <>
      <div className="relative">
        <Image
          src={"/bannerLarge.webp"}
          alt="Large banner"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-[100vw] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center bg-black bg-opacity-10 font-medium">
          <div className="flex w-[50%] flex-col items-center justify-center gap-2 px-4 text-center md:w-[50%] md:gap-4 md:px-6 lg:w-[40%] lg:gap-6 lg:px-8 xl:w-[30%] xl:gap-8 xl:px-10">
            <span className="text-sm font-bold text-white md:text-xl lg:text-3xl">
              NHỮNG MÓN ĐỒ THIẾT YẾU CHO MÙA ĐÔNG TỪ 26 USD TRỞ LÊN
            </span>
            <span className="hidden text-sm text-white md:block">
              Những lớp áo bền bỉ, giá cả phải chăng, và thoải mái đến mức bạn
              không muốn cởi ra, đủ để đồng hành suốt cả mùa và hơn thế nữa.
            </span>
            <div className="flex flex-col items-center gap-2 text-sm md:flex-row">
              {categoryOfBanner.map((category) => (
                <Link
                  key={category}
                  href={`${COLLECTIONS_LINK}/${category}`}
                  className="w-full whitespace-nowrap rounded-full bg-white p-2 text-xs font-bold uppercase md:px-4 md:py-3 md:text-base"
                >
                  Shop {category}'s
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
