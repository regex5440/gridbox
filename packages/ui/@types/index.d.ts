import { ButtonProps } from "./Button";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  tags: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  weight: number;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
};

type CartItem = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paidAmount: number;
  shippingLocation: string;
  contactInfo: string;
  paymentStatus: "pending" | "success" | "failed" | "refunded";
  createdAt: Date;
  orderItem: {
    id: string;
    orderId: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export { ButtonProps, Product, CartItem, Order };
