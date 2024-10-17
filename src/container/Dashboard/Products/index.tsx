import Products from "@/components/Dashboard/Products";
import db from "@/lib/client";
import React from "react";

const ProductsManageContainer = async () => {
  const listProducts = await db.product.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      colors: true,
      productSizes: true,
    },
  });
  return <Products listProducts={listProducts} />;
};

export default ProductsManageContainer;
