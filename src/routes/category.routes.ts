import { Router } from 'express';

import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from '#controllers';

import { basicErrorHandler, extendedErrorHandler, validate } from '#middleware';
import {
  createCategoryZodSchema,
  updateCategoryZodSchema,
  categoryIdParamsZodSchema,
} from '#schemas';

const categoryRouter = Router();

categoryRouter
  .route('/')
  .get(getCategories)
  .post(validate(createCategoryZodSchema), createCategory);

categoryRouter
  .route('/:id')
  .get(validate(categoryIdParamsZodSchema, 'params'), getCategoryById)
  .patch(
    validate(categoryIdParamsZodSchema, 'params'),
    validate(updateCategoryZodSchema),
    updateCategory,
  )
  .delete(validate(categoryIdParamsZodSchema, 'params'), deleteCategory);

export default categoryRouter;
