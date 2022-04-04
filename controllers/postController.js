const { createBlogPosts, listAllPosts } = require('../services/postService');
// const {} = require('../services/categoryService');

const createBlogPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user.data;

  try {
    const result = await createBlogPosts(title, content, categoryIds, email);
    return res.status(201).json(result);
  } catch (error) {
    next(error); 
  }
};

const listAllPost = async (req, res, next) => {
  try {
    const result = await listAllPosts();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
  listAllPost,
};