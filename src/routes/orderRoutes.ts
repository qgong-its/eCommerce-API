import { Router } from 'express';

import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '#controllers';

import { basicErrorHandler, extendedErrorHandler, validate } from '#middleware';
import {
  createOrderZodSchema,
  updateOrderZodSchema,
  orderIdParamsZodSchema,
} from '#schemas';

const orderRouter = Router();

orderRouter
  .route('/')
  .get(getOrders)
  .post(validate(createOrderZodSchema), createOrder);

orderRouter
  .route('/:id')
  .get(validate(orderIdParamsZodSchema, 'params'), getOrderById)
  .patch(
    validate(orderIdParamsZodSchema, 'params'),
    validate(updateOrderZodSchema),
    updateOrder,
  )
  .delete(validate(orderIdParamsZodSchema, 'params'), deleteOrder);

export default orderRouter;
