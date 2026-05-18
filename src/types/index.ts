import type { Types } from 'mongoose';

export type CategoryType = {
  name: string;
};

export type ProductType = {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
};

export type OrderProductType = {
  productId: Types.ObjectId;
  quantity: number;
};

export type OrderType = {
  userId: Types.ObjectId;
  products: OrderProductType[];
  total: number;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
};
