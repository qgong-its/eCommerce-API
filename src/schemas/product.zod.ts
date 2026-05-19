import { z } from 'zod';
import { objectIdZodSchema } from './common/objectId.zod.ts';

export const productNameZodSchema = z
  .string()
  .trim()
  .min(1, 'Product name is required')
  .max(100, 'Product name is too long');

export const descriptionZodSchema = z
  .string()
  .trim()
  .min(1, 'Description is required')
  .max(500, 'Description is too long');

export const priceZodSchema = z
  .number()
  .nonnegative('Price cannot be negative')
  .multipleOf(0.01, 'Price allows maximum 2 decimal places');

export const productIdParamsZodSchema = z
  .object({
    id: objectIdZodSchema,
  })
  .strict();

export type ProductIdParamsZodDTO = z.infer<typeof productIdParamsZodSchema>;

export const createProductZodSchema = z
  .object({
    name: productNameZodSchema,
    description: descriptionZodSchema,
    price: priceZodSchema,
    categoryId: objectIdZodSchema,
  })
  .strict();

export type CreateProductZodDTO = z.infer<typeof createProductZodSchema>;

export const updateProductZodSchema = createProductZodSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export type UpdateProductZodDTO = z.infer<typeof updateProductZodSchema>;
