type TrendingPost = {
  name: string;
  desc: string;
  image: string;
  tag: string;
  more?: string;
};

// PRODUCT
interface ProductColor {
  colorName: string;
  colorHex: string;
  images: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  fit: string;
  colors: ProductColor[];
}
