import AllProducts from "@/components/Collections/AllProducts";
import db from "@/lib/client";
import { Category } from "@prisma/client";
import React from "react";

const AllProductsContainer = async ({ category }: { category?: string }) => {
  const categoryEnum =
    category && category !== "all"
      ? (category.toUpperCase() as Category)
      : undefined;

  const listProducts = await db.product.findMany({
    take: 60,
    where: categoryEnum ? { category: categoryEnum } : undefined,
    include: {
      colors: true,
      productSizes: true,
    },
  });
  return <AllProducts listProducts={listProducts} />;
};

export default AllProductsContainer;
