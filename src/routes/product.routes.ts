import { Router } from 'express';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '#controllers';

import { validate } from '#middleware';
import {
  createProductZodSchema,
  updateProductZodSchema,
  productIdParamsZodSchema,
} from '#schemas';

const productRouter = Router();

productRouter
  .route('/')
  .get(getProducts)
  .post(validate(createProductZodSchema), createProduct);

productRouter
  .route('/:id')
  .get(validate(productIdParamsZodSchema, 'params'), getProductById)
  .patch(
    validate(productIdParamsZodSchema, 'params'),
    validate(updateProductZodSchema),
    updateProduct,
  )
  .delete(validate(productIdParamsZodSchema, 'params'), deleteProduct);

export default productRouter;
