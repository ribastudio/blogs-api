const { BlogPost, User, PostCategory, Category } = require('../models');
// const { listArrayCategoryById } = require('./categoryService');
const CustomError = require('../helpers/customError');

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

const listPostsById = async (id) => {
  const postById = await BlogPost.findOne(
    { where: { id },
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
     ],
    },
  );
  
  if (!postById) {
    throw new CustomError('ENTITY_FAILED', 'Post does not exist');
  }

  return postById;
};

const verifyAuthors = async (email, id) => {
  const verifyAuthor = await BlogPost.findOne({ where: { id } });
  const { dataValues } = await User.findOne({ where: { email } });

  if (verifyAuthor.id !== dataValues.id) {
    throw new CustomError('INVALID_AUTH', 'Unauthorized user');
  }
  return null;
};

const updatePost = async (id, title, content) => {  
  try {
    await BlogPost.update({ title, content }, { where: { id } });
    
    const findId = await BlogPost.findOne({ where: { id },
      include: [
        { model: Category,
          as: 'categories', 
          attributes: ['id', 'name'],
        },
      ],
      attributes: { exclude: ['id', 'published', 'updated'] },
    });
    return findId;
  } catch (error) {
    return error;
  }  
};

module.exports = {
  createBlogPosts,
  listAllPosts,
  listPostsById,
  updatePost,
  verifyAuthors,
};