import {
  FEATURED_POSTERS,
  PRODUCT_CATEGORIES,
  UPCOMING_POSTERS,
} from "@/constants/fakeData";
import Banner from "./Banner";
import TrendingItemsSection from "./TrendingItemsSection";
import PosterShop from "./PosterShop";
import { ProductInfo } from "@/interfaces/common";

const Homepage = ({ listProducts }: { listProducts: ProductInfo[] }) => {
  const listProductsLimit = listProducts?.slice(0, 10);
  const productsRandom = listProductsLimit?.sort(() => Math.random() - 0.5);

  // Men products
  const listProductsMen = listProducts?.filter(
    (item) => item.category === "men",
  );

  return (
    <>
      {/* TOP */}
      <div>
        <Banner bannerLarge="/bannerLarge.jpg" bannerSmall="/bannerSmall.jpg" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4">
        {/* Random 10 products */}
        <TrendingItemsSection
          type="products"
          productsRandom={productsRandom}
          title="NEW SEASON + NEW DROPS = MORE PROGRESS"
        />
        {/* Featured post */}
        <TrendingItemsSection
          type="posts"
          posts={FEATURED_POSTERS}
          categories={["men", "women"]}
          title="ĐANG HOT HIỆN TẠI"
        />
        {/* poster */}
        <PosterShop data={PRODUCT_CATEGORIES} />
        {/* Upcoming posts */}
        <TrendingItemsSection
          type="posts"
          posts={UPCOMING_POSTERS}
          categories={["trending", "styling", "training", "apps"]}
          title="WAIT THERE’S MORE…"
        />
        {/* Men products */}
        <TrendingItemsSection
          type="products"
          productsRandom={listProductsMen}
          title="SHOP CBUM’S TOP PICKS"
          listFor="Mens"
        />
      </div>
    </>
  );
};

export default Homepage;
