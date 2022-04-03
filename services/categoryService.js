const CustomError = require('../helpers/customError');
const { Category } = require('../models');

const createCategory = async (category) => {
  if (!category) {
    throw new CustomError('INVALID_FIELDS', '"name" is required');
  }

  const result = await Category.create({ name: category });
  return { result };
};

module.exports = {
  createCategory,
};