import { ProductModel } from '#models';
import { AppError } from '#utils';

export const assertProductExists = async (productId: string) => {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new AppError(
      404,
      `Product: ${productId} not found`,
      'NO_PRODUCT',
      'WARN',
    );
  }

  return product;
};

export const assertProductNameAvailable = async (
  name: string,
  categoryId: string,
  excludeId?: string,
) => {
  const found = await ProductModel.findOne({
    name,
    categoryId,
    ...(excludeId && {
      _id: { $ne: excludeId },
    }),
  });

  if (found) {
    throw new AppError(
      400,
      `Product: ${name} already exists`,
      'EXISTED_PRODUCT',
      'WARN',
    );
  }
};
