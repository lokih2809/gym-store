import Banner from "@/components/Home/Banner";
import Notification from "@/components/Home/Notification";
import PosterShop from "@/components/Home/PosterShop";
import TrendingItemsSection from "@/components/Home/TrendingItemsSection";
import {
  UPCOMING_POSTERS,
  PRODUCT_CATEGORIES,
  FEATURED_POSTERS,
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
          data={FEATURED_POSTERS}
          categories={["men", "women"]}
          title="ĐANG HOT HIỆN TẠI"
        />
        <PosterShop data={PRODUCT_CATEGORIES} />
        <TrendingItemsSection
          data={UPCOMING_POSTERS}
          categories={["trending", "styling", "training", "apps"]}
          title="WAIT THERE’S MORE…"
        />
      </div>
    </div>
  );
};

export default Homepage;
