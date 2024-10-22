import { Category, ProductColor, ProductSize, Role } from "@prisma/client";

export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: Category;
  fit: string;
  createdAt: Date;
  colors: ProductColor[];
  productSizes: ProductSize[];
}

export interface ListProducts {
  listProducts: ProductInfo[];
}

export interface Post {
  name: string;
  desc: string;
  image: string;
  tag: string;
  more?: string;
}

export type UserWithoutPassword = {
  id: number;
  email: string;
  username: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  address: string | null;
};
