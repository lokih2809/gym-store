import Homepage from "@/components/Home";
import prisma from "@/lib/client";

const HomepageContainer = async () => {
  const listProducts = await prisma.product.findMany({
    take: 60,
    include: {
      colors: true,
      productSizes: true,
    },
  });

  return <Homepage listProducts={listProducts} />;
};

export default HomepageContainer;
