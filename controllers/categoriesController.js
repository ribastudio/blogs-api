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

module.exports = {
  createCategory,
};