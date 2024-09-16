export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  fit: string;
  colors: {
    id: number;
    productId: number;
    colorName: string;
    colorHex: string;
    images: string[];
  }[];
  sizes: {
    id: number;
    size: string;
  }[];
}
