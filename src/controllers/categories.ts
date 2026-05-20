import type { RequestHandler } from 'express';

import { CategoryModel } from '#models';
import type {
  CategoryIdParamsZodDTO,
  CreateCategoryZodDTO,
  UpdateCategoryZodDTO,
} from '#schemas';
import { AppError } from '#utils';
import { assertCategoryExists, assertCategoryNameAvailable } from '#services';

export const getCategories: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await CategoryModel.find();

    res.json(categories);
  } catch (error: unknown) {
    next(error);
  }
};

export const getCategoryById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as CategoryIdParamsZodDTO;
    const category = await assertCategoryExists(id);

    res.json(category);
  } catch (error: unknown) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body as CreateCategoryZodDTO;

    await assertCategoryNameAvailable(data.name);

    const category = await CategoryModel.create(data);

    res.status(201).json(category);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as CategoryIdParamsZodDTO;
    const data = req.body as UpdateCategoryZodDTO;

    if (data.name) {
      await assertCategoryNameAvailable(data.name, id);
    }

    const category = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      throw new AppError(
        404,
        `Category: ${id} not found`,
        'NO_CATEGORY',
        'WARN',
      );
    }

    res.json(category);
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params as CategoryIdParamsZodDTO;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new AppError(
        404,
        `Category: ${id} not found`,
        'NO_CATEGORY',
        'WARN',
      );
    }

    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
