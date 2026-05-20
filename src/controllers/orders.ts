import type { RequestHandler } from 'express';

import { OrderModel } from '#models';
import type {
  OrderIdParamsZodDTO,
  CreateOrderZodDTO,
  UpdateOrderZodDTO,
} from '#schemas';
import { AppError } from '#utils';
import { assertUserExists, calculateOrderTotal } from '#services';

export const getOrders: RequestHandler = async (_req, res, next) => {
  try {
    const orders = await OrderModel.find();

    res.json(orders);
  } catch (error: unknown) {
    next(error);
  }
};

export const getOrderById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as OrderIdParamsZodDTO;
    const order = await OrderModel.findById(id);

    if (!order) {
      throw new AppError(404, `Order: ${id} not found`, 'NO_ORDER', 'WARN');
    }

    res.json(order);
  } catch (error: unknown) {
    next(error);
  }
};

export const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body as CreateOrderZodDTO;

    await assertUserExists(data.userId);

    const total = await calculateOrderTotal(data.products);

    const order = await OrderModel.create({ ...data, total });

    res.status(201).json(order);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as OrderIdParamsZodDTO;
    const data = req.body as UpdateOrderZodDTO;

    const order = await OrderModel.findById(id);

    if (!order) {
      throw new AppError(404, `Order: ${id} not found`, 'NO_ORDER', 'WARN');
    }

    const total = await calculateOrderTotal(data.products);

    const newOrder = await OrderModel.findByIdAndUpdate(
      id,
      { ...data, total },
      {
        new: true,
        runValidators: true,
      },
    );

    res.json(newOrder);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as OrderIdParamsZodDTO;
    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      throw new AppError(404, `Order: ${id} not found`, 'NO_ORDER', 'WARN');
    }

    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
