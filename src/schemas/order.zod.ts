import { z } from 'zod';
import { objectIdZodSchema } from './common/objectId.zod.ts';

export const productIdParamsZodSchema = z
  .object({ id: objectIdZodSchema })
  .strict();

export const quantityZodSchema = z
  .number()
  .int('Quantity must be an integer')
  .min(1, 'At least one product is required')
  .max(10, 'A maximum of 10 items may be ordered per order');

export const orderProductZodSchema = z
  .object({
    productId: objectIdZodSchema,
    quantity: quantityZodSchema,
  })
  .strict();

export const userIdParamsZodSchema = z
  .object({ id: objectIdZodSchema })
  .strict();

export const orderIdParamsZodSchema = z
  .object({ id: objectIdZodSchema })
  .strict();

export type OrderIdParamsZodDTO = z.infer<typeof orderIdParamsZodSchema>;

export const createOrderZodSchema = z
  .object({
    userId: objectIdZodSchema,
    products: z
      .array(orderProductZodSchema)
      .min(1, 'At least one product is required'),
  })
  .strict();

export type CreateOrderZodDTO = z.infer<typeof createOrderZodSchema>;

export const updateOrderZodSchema = z
  .object({
    products: z
      .array(orderProductZodSchema)
      .min(1, 'At least one product is required')
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one product is required',
  });

export type UpdateOrderZodDTO = z.infer<typeof updateOrderZodSchema>;
