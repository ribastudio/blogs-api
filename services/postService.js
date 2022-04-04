const { BlogPost, User, PostCategory, Category } = require('../models');
// const { listArrayCategoryById } = require('./categoryService');
// const CustomError = require('../helpers/customError');

const connectPostAndCategory = async (postId, categoriesIds) => categoriesIds
    .map((categoryId) => (
      { postId,
        categoryId,
      }
    ));

const createBlogPosts = async (title, content, categoriesIds, userEmail) => {
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

const listAllPosts = async () => {
  const listOfAllPosts = await BlogPost.findAll(
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
     ],
    },
  );

  return listOfAllPosts;
};

module.exports = {
  createBlogPosts,
  listAllPosts,
};