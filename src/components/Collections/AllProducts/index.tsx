import { ProductInfo } from "@/types/common";
import List from "./List";

const AllProducts = async ({
  listProducts,
}: {
  listProducts: ProductInfo[];
}) => {
  return (
    <>
      <div className="px-4 lg:px-8">
        {/* TOP */}
        <div className="flex flex-col gap-4 py-6">
          <div className="flex items-center">
            <b className="text-xl lg:text-2xl">ALL PRODUCTS</b>
            <span className="ml-4 text-xs">{listProducts.length} Products</span>
          </div>
          <span className="text-sm">Shop all products</span>
        </div>

        {/* Content */}
        <div>
          {listProducts.length > 0 ? (
            <List listProducts={listProducts} />
          ) : (
            <div className="py-4 text-center">No products found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
