import Homepage from "@/components/Home";
import db from "@/lib/client";

const HomepageContainer = async () => {
  const listProducts = await db.product.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      colors: true,
      productSizes: true,
    },
  });

  const listPosts = await db.post.findMany({
    take: 10,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return <Homepage listProducts={listProducts} listPosts={listPosts} />;
};

export default HomepageContainer;
