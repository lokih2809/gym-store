import AllProductsContainer from "@/container/Collections/AllProducts";
import React from "react";

const Page = async ({ params }: { params: { category?: string } }) => {
  const { category } = params;

  return <AllProductsContainer category={category} />;
};

export default Page;
