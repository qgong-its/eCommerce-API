import { model } from 'mongoose';
import type { CategoryType } from '#types';
import { categorySchema } from './category.schema.ts';

export const CategoryModel = model<CategoryType>('Category', categorySchema);
