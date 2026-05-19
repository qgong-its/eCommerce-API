import { CategoryModel } from '#models';
import { AppError } from '#utils';

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
      'Category already exists',
      'EXISTED_CATEGORY',
      'WARN',
    );
  }
};

export const assertCategoryExists = async (categoryId: string) => {
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new AppError(404, 'Category not found', 'NO_CATEGORY', 'WARN');
  }

  return category;
};
