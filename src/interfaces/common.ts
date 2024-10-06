import { Product, ProductColor, ProductSize } from "@prisma/client";

export interface ProductInfo extends Product {
  colors: ProductColor[];
  productSizes: ProductSize[];
}

export interface Post {
  name: string;
  desc: string;
  image: string;
  tag: string;
  more?: string;
}
