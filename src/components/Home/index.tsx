"use client";

import { PRODUCT_CATEGORIES } from "@/constants/data";
import Banner from "./Banner";
import TrendingItemsSection from "./TrendingItemsSection";
import PosterShop from "./PosterShop";
import { ProductInfo } from "@/types/common";
import { Post } from "@prisma/client";

interface Props {
  listProducts: ProductInfo[];
  listPosts: Post[];
}

const Homepage = ({ listProducts, listPosts }: Props) => {
  const listProductsMen = listProducts?.filter(
    (item) => item.category === "MEN",
  );

  const posterCategory = PRODUCT_CATEGORIES.filter(
    (category) => category.name !== "Tất cả",
  );

  return (
    <>
      {/* TOP */}
      <Banner />

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4 xl:gap-8">
        {/* Random 10 new products */}
        <TrendingItemsSection
          type="products"
          productsRandom={listProducts}
          title="New Arrivals"
        />

        {/* New posts */}
        <TrendingItemsSection
          type="posts"
          posts={listPosts}
          title="Phong cách & cách phối đồ"
        />

        {/* poster */}
        <PosterShop data={posterCategory} />

        {/* Men products */}
        <TrendingItemsSection
          type="products"
          productsRandom={listProductsMen}
          title="MUA NGAY NHỮNG SẢN PHẨM YÊU THÍCH CỦA CBUM"
          listFor="Mens"
        />
      </div>
    </>
  );
};

export default Homepage;
