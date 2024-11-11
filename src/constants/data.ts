import { COLLECTIONS_LINK } from "./common";

export const PRODUCT_CATEGORIES = [
  {
    name: "women's",
    images: [
      "/Product Categories/women1.avif",
      "/Product Categories/women2.avif",
    ],
    poster: "/posterWomen.avif",
    link: `${COLLECTIONS_LINK}/women`,
  },
  {
    name: "men's",
    images: ["/Product Categories/men1.avif", "/Product Categories/men2.avif"],
    poster: "/posterMen.avif",
    link: `${COLLECTIONS_LINK}/men`,
  },
  {
    name: "accessories",
    images: ["/Product Categories/accessories.avif"],
    poster: "/Featured Posters/popularWomen6.avif",
    link: `${COLLECTIONS_LINK}/accessories`,
  },
];

export const CATEGORIES = ["WOMEN", "MEN", "ACCESSORIES"];

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export const STATUS = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];
