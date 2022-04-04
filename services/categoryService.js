const CustomError = require('../helpers/customError');
const { Category } = require('../models');

const createCategory = async (category) => {
  if (!category) {
    throw new CustomError('INVALID_FIELDS', '"name" is required');
  }

  const result = await Category.create({ name: category });
  return { result };
};

const listAllCategories = async () => {
  const result = await Category.findAll();
  result.sort((a, b) => b.name.localeCompare(a.name)); // doc do sort
  return result;
};

const listCategoryById = async (id) => {
  const result = await Category.findByPk(id);
  return { result };
};

const listArrayCategoryById = async (array) => {
  const result = await Category.findAll({ where: { id: array } });
  return result;
};

module.exports = {
  createCategory,
  listAllCategories,
  listCategoryById,
  listArrayCategoryById,
};