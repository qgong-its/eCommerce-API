import type { RequestHandler } from 'express';

import { ProductModel } from '#models';
import type {
  ProductIdParamsZodDTO,
  CreateProductZodDTO,
  UpdateProductZodDTO,
} from '#schemas';
import { AppError } from '#utils';
import { assertProductExists, assertProductNameAvailable } from '#services';

export const getProducts: RequestHandler = async (_req, res, next) => {
  try {
    const products = await ProductModel.find();

    res.json(products);
  } catch (error: unknown) {
    next(error);
  }
};

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as ProductIdParamsZodDTO;
    const product = await assertProductExists(id);

    res.json(product);
  } catch (error: unknown) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body as CreateProductZodDTO;

    await assertProductNameAvailable(data.name, data.categoryId);

    const product = await ProductModel.create(data);

    res.status(201).json(product);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as ProductIdParamsZodDTO;
    const data = req.body as UpdateProductZodDTO;

    if (data.name && data.categoryId) {
      await assertProductNameAvailable(data.name, data.categoryId);
    }

    const product = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new AppError(404, `Product: ${id} not found`, 'NO_PRODUCT', 'WARN');
    }

    res.json(product);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as ProductIdParamsZodDTO;
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      throw new AppError(404, `Product: ${id} not found`, 'NO_PRODUCT', 'WARN');
    }

    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
