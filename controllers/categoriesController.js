const categoriesService = require('../services/categoryService.js');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  console.log('vem do controller', name);

  try {
    const { result } = await categoriesService.createCategory(name);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const listCategory = async (_req, res, next) => {
  try {
    const result = await categoriesService.listAllCategories();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await categoriesService.listCategoryById(id);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  listCategory,
  listCategoryById,
};