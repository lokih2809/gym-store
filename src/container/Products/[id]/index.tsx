import ProductDetail from "@/components/Products/[id]";
import db from "@/lib/client";
import { notFound } from "next/navigation";
import React from "react";

const ProductDetailContainer = async ({ id }: { id: number }) => {
  const productInfo = await db.product.findFirst({
    where: {
      id: id,
    },
    include: {
      colors: true,
      productSizes: true,
    },
  });

  if (!productInfo) return notFound();

  return <ProductDetail productInfo={productInfo} />;
};

export default ProductDetailContainer;
