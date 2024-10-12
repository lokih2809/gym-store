import Homepage from "@/components/Home";
import db from "@/lib/client";

const HomepageContainer = async () => {
  const listProducts = await db.product.findMany({
    take: 60,
    include: {
      colors: true,
      productSizes: true,
    },
  });

  return <Homepage listProducts={listProducts} />;
};

export default HomepageContainer;
