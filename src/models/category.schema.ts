import type { CategoryType } from '#types';
import { Schema } from 'mongoose';

export const categorySchema = new Schema<CategoryType>({
  name: {
    type: String,
    required: [true, 'Category Name is required'],
    trim: true,
  },
});

categorySchema.set('toJSON', {
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
