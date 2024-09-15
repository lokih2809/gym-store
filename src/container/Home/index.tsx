import Banner from "@/components/Home/Banner";
import Notification from "@/components/Home/Notification";
import PosterShop from "@/components/Home/PosterShop";
import TrendingItemsSection from "@/components/Home/TrendingItemsSection";
import {
  FUTURE_POSTERS,
  LINK_PRODUCT,
  POPULAR_POSTERS,
} from "@/constants/fakeData";
import React from "react";

const Homepage = () => {
  return (
    <div className="">
      {/* TOP */}
      <div>
        <Notification />
        <Banner bannerLarge="/bannerLarge.jpg" bannerSmall="/bannerSmall.jpg" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4 lg:gap-20">
        <TrendingItemsSection
          data={POPULAR_POSTERS}
          categories={["men", "women"]}
          title="ĐANG HOT HIỆN TẠI"
        />
        <PosterShop data={LINK_PRODUCT} />
        <TrendingItemsSection
          data={FUTURE_POSTERS}
          categories={["trending", "styling", "training", "apps"]}
          title="WAIT THERE’S MORE…"
        />
      </div>
    </div>
  );
};

export default Homepage;
