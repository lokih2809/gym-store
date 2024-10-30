import {
  Category,
  Order,
  OrderItem,
  ProductColor,
  ProductSize,
  Role,
  User,
} from "@prisma/client";

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
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  address: string | null;
};

export enum PaymentMethodEnum {
  SHIPCOD = "SHIPCOD",
  VNPAY = "VNPAY",
}

export interface OrderWithUser extends Order {
  user: User;
  orderItems: OrderItemWithProduct[];
}

export interface OrderItemWithProduct extends OrderItem {
  product: {
    name: string;
    price: number;
  };
}

export interface OrderWithProduct extends Order {
  orderItems: OrderItemWithProduct[];
}
