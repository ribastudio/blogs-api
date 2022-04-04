const { BlogPost, User, PostCategory } = require('../models');
// const { listArrayCategoryById } = require('./categoryService');
// const CustomError = require('../helpers/customError');

const connectPostAndCategory = async (postId, categoriesIds) => {
  console.log('entrou pra fazer o array de objetos');
  return categoriesIds.map((categoryId) => ({
    postId,
    categoryId, 
  }));
};

const createBlogPosts = async (title, content, categoriesIds, userEmail) => {
  // const resultIdsArray = await listArrayCategoryById(categoryIds);
  
  // // if (resultIdsArray.length < 1) {
  // //   throw new CustomError('INVALID_FIELDS', '"categoryIds" not found');
  // // }

  // // if (categoryIds.length !== resultIdsArray.length) {
  // //   throw new CustomError('INVALID_FIELDS', '"name" is required');
  // // }
  const { dataValues } = await User.findOne({ where: { email: userEmail } });
  
  const createdPost = await BlogPost.create({ title, content, userId: dataValues.id });
  
  const categories = await connectPostAndCategory(createdPost.id, categoriesIds);

  await PostCategory.bulkCreate(categories);
  
  return {
    id: createdPost.id,
    userId: dataValues.id,
    title,
    content,
  };
};

module.exports = {
  createBlogPosts,
};