import { z } from 'zod';
import { objectIdZodSchema } from './common/objectId.zod.ts';

export const categoryNameZodSchema = z
  .string()
  .trim()
  .min(1, 'Category name is required')
  .max(20, 'Category name is too long');

export const categoryIdParamsZodSchema = z
  .object({
    id: objectIdZodSchema,
  })
  .strict();

export type CategoryIdParamsZodDTO = z.infer<typeof categoryIdParamsZodSchema>;

export const createCategoryZodSchema = z
  .object({
    name: categoryNameZodSchema,
  })
  .strict();

export type CreateCategoryZodDTO = z.infer<typeof createCategoryZodSchema>;

export const updateCategoryZodSchema = createCategoryZodSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field is required',
  });

export type UpdateCategoryZodDTO = z.infer<typeof updateCategoryZodSchema>;
