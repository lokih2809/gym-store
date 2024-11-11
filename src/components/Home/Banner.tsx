import Image from "next/image";
import React from "react";

interface Props {
  bannerSmall: string;
  bannerLarge: string;
}

const Banner = ({ bannerSmall, bannerLarge }: Props) => {
  return (
    <>
      {/* Small image */}
      <div className="relative mt-8 block h-[80vh] w-full md:hidden">
        <Image
          src={bannerSmall}
          alt="Small banner"
          fill
          className="w-full object-cover"
        />
        <div className="absolute bottom-4 flex w-full flex-col gap-6 px-4 font-medium">
          <span className="text-2xl font-bold text-white">
            CHRIS BUMSTEAD IS BACK
          </span>
          <span className="text-white">
            Bodybuilder. 5-time Classic Physique champion. GymShark athlete.
          </span>
          <button className="rounded-full bg-white py-3 font-bold uppercase">
            Shop cbum&apos;s top picks
          </button>
        </div>
      </div>

      {/* Large image */}
      <div className="relative hidden h-[55vh] w-full md:block">
        <Image
          src={bannerLarge}
          alt="Large banner"
          fill
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-10 font-medium">
          <div className="flex w-[50%] flex-col items-center justify-center gap-6 text-center lg:w-[35%]">
            <span className="text-3xl font-bold text-white lg:text-5xl">
              CHRIS BUMSTEAD IS BACK
            </span>
            <span className="text-white">
              Bodybuilder. 5-time Classic Physique champion. GymShark athlete.
            </span>
            <button className="w-[70%] rounded-full bg-white px-4 py-3 font-bold uppercase lg:w-[70%] xl:w-[50%]">
              Shop cbum&apos;s top picks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
