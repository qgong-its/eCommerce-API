import { model } from 'mongoose';
import type { ProductType } from '#types';
import { productSchema } from './product.schema.ts';

export const ProductModel = model<ProductType>('Product', productSchema);
