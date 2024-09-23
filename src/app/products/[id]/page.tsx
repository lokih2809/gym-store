import ProductDetailContainer from "@/container/Products/[id]";

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <ProductDetailContainer id={+id} />;
};

export default Page;
