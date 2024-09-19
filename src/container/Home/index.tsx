import Banner from "@/components/Home/Banner";
import PosterShop from "@/components/Home/PosterShop";
import TrendingItemsSection from "@/components/Home/TrendingItemsSection";
import {
  UPCOMING_POSTERS,
  PRODUCT_CATEGORIES,
  FEATURED_POSTERS,
  LIST_PRODUCTS,
} from "@/constants/fakeData";
import React from "react";

const Homepage = () => {
  return (
    <>
      {/* TOP */}
      <div>
        <Banner bannerLarge="/bannerLarge.jpg" bannerSmall="/bannerSmall.jpg" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4 lg:gap-20">
        <TrendingItemsSection
          type="posts"
          posts={FEATURED_POSTERS}
          categories={["men", "women"]}
          title="ĐANG HOT HIỆN TẠI"
        />
        <TrendingItemsSection
          type="products"
          products={LIST_PRODUCTS}
          title="NEW SEASON + NEW DROPS = MORE PROGRESS"
        />

        <PosterShop data={PRODUCT_CATEGORIES} />
        <TrendingItemsSection
          type="posts"
          posts={UPCOMING_POSTERS}
          categories={["trending", "styling", "training", "apps"]}
          title="WAIT THERE’S MORE…"
        />
      </div>
    </>
  );
};

export default Homepage;
