const express = require('express');

const { createBlogPost } = require('../controllers/postController.js');

const { verifyPost, verifyCategories } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const router = express.Router();

// router.get('/', listUser);
// router.post('/', );
router.post('/', auth, verifyPost, verifyCategories, createBlogPost);
// router.delete('/', );

module.exports = router;
