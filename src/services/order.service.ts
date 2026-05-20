import type { CreateOrderZodDTO } from '#schemas';
import { assertProductExists } from './product.service.ts';

export const calculateOrderTotal = async (
  products: CreateOrderZodDTO['products'],
) => {
  let total = 0;

  for (const item of products) {
    const product = await assertProductExists(item.productId.toString());

    total += product.price * item.quantity;
  }

  return Number(total.toFixed(2));
};
