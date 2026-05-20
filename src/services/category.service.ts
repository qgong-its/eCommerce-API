import { CategoryModel } from '#models';
import { AppError } from '#utils';

export const assertCategoryExists = async (categoryId: string) => {
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new AppError(
      404,
      `Category: ${categoryId} not found`,
      'NO_CATEGORY',
      'WARN',
    );
  }

  return category;
};

export const assertCategoryNameAvailable = async (
  name: string,
  excludeId?: string,
) => {
  const found = await CategoryModel.findOne({
    name,
    ...(excludeId && {
      _id: { $ne: excludeId },
    }),
  });

  if (found) {
    throw new AppError(
      400,
      `Category: ${name} already exists`,
      'EXISTED_CATEGORY',
      'WARN',
    );
  }
};
