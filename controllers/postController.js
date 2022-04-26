const CustomError = require('../helpers/customError');
const postService = require('../services/postService');

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

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.user.data;

  try {
    await postService.verifyAuthors(email, id);
    const result = await postService.updatePost(id, title, content);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user.data;

  try {
    await postService.verifyAuthors(email, id);
    const result = await postService.deletePosts(id);

    if (result !== 'SUCCESS') {
      throw new CustomError('ENTITY_FAILED', 'An error occurred');
    }
    
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchPostContent = async (req, res, next) => {
  console.log(req.queryParam);
  try {
    if (!req.queryParam) {
      const resultAll = await postService.listAllPosts();
      return res.status(200).json(resultAll);
    }

    if (req.queryParam === '') {
      return res.status(200).json([]);
    }

    const searchResults = await postService.searchAtPosts();
    return res.status(201).json(searchResults);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
  listAllPost,
  listPostsById,
  updatePost,
  deletePost,
  searchPostContent,
};