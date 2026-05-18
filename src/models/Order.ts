import { model } from 'mongoose';
import type { OrderType } from '#types';
import { orderSchema } from './order.schema.ts';

export const OrderModel = model<OrderType>('Order', orderSchema);
