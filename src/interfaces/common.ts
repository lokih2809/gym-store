import { Product, ProductColor, ProductSize } from "@prisma/client";

export interface ProductInfo extends Product {
  colors: ProductColor[];
  productSizes: ProductSize[];
}
