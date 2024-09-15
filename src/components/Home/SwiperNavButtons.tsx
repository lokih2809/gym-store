import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns flex gap-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="rounded-full bg-black p-1"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="rounded-full bg-black p-1"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};
