import { ButtonProps } from "./Button";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type CartItem = {
  productId: string;
  quantity: number;
};

export { ButtonProps, Product, CartItem };
