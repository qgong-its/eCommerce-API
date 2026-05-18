import type { CategoryType } from '#types';
import { Schema } from 'mongoose';

export const categorySchema = new Schema<CategoryType>({
  name: {
    type: String,
    required: [true, 'Category Name is required'],
    trim: true,
  },
});
