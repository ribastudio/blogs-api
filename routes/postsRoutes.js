const express = require('express');

const { createBlogPost, listAllPost, listPostsById } = require('../controllers/postController.js');

const { verifyPost, verifyCategories } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const router = express.Router();

router.get('/', auth, listAllPost);
router.get('/:id', auth, listPostsById);
// router.post('/', );
router.post('/', auth, verifyPost, verifyCategories, createBlogPost);
// router.delete('/', );

module.exports = router;
