import type { ProductType } from '#types';
import { Schema } from 'mongoose';

export const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category id is required'],
      ref: 'Category', // model name
    },
  },
  {
    timestamps: true,
  },
);
