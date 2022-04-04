const postService = require('../services/postService');
// const {} = require('../services/categoryService');

const createBlogPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user.data;

  try {
    const result = await postService.createBlogPosts(title, content, categoryIds, email);
    return res.status(201).json(result);
  } catch (error) {
    next(error); 
  }
};

const listAllPost = async (req, res, next) => {
  try {
    const result = await postService.listAllPosts();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listPostsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await postService.listPostsById(id);
    
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
  listAllPost,
  listPostsById,
};