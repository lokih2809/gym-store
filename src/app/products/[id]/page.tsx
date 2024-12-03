import ProductDetailContainer from "@/container/Products/[id]";

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return <ProductDetailContainer id={+id} />;
};

export default Page;
