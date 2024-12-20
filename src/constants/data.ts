import { COLLECTIONS_LINK } from "./common";

export const PRODUCT_CATEGORIES = [
  {
    name: "Tất cả",
    image: "/productCategory/women2.avif",
    poster: "/posterWomen.avif",
    link: `${COLLECTIONS_LINK}`,
  },
  {
    name: "Của Nữ",
    image: "/productCategory/women1.avif",
    poster: "/posterWomen.avif",
    link: `${COLLECTIONS_LINK}/women`,
  },
  {
    name: "Của Nam",
    image: "/productCategory/men1.avif",
    poster: "/posterMen.avif",
    link: `${COLLECTIONS_LINK}/men`,
  },
  {
    name: "Phụ kiện",
    image: "/productCategory/accessories.avif",
    poster: "/popularWomen6.avif",
    link: `${COLLECTIONS_LINK}/accessories`,
  },
];

export const CATEGORIES = ["WOMEN", "MEN", "ACCESSORIES"];

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export const STATUS = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];
