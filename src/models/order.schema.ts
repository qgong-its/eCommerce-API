import type { OrderProductType, OrderType } from '#types';
import { Schema } from 'mongoose';

export const orderProductSchema = new Schema<OrderProductType>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product id is required'],
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
  },
  {
    _id: false, // Disable automatic _id generation for embedded order items
  },
);

orderProductSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const response = ret as {
      _id?: { toString: () => string };
      id?: string;
      __v?: number;
    };

    response.id = response._id?.toString();

    delete response._id;
    delete response.__v;

    return ret;
  },
});

export const orderSchema = new Schema<OrderType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    products: {
      type: [orderProductSchema],
      required: [true, 'Products are required'],
      validate: {
        validator: (products: OrderProductType[]) => products.length > 0,
        message: 'At least one product is required',
      },
    },
    total: {
      type: Number,
      required: [true, 'Total is required'],
      min: [0, 'Total cannot be negative'],
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const response = ret as {
      _id?: { toString: () => string };
      id?: string;
      __v?: number;
    };

    response.id = response._id?.toString();

    delete response._id;
    delete response.__v;

    return ret;
  },
});
