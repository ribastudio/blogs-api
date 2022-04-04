const express = require('express');

// const { verifyUser } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const { createCategory,
        listCategory,
        listCategoryById } = require('../controllers/categoriesController');

const router = express.Router();

router.get('/', auth, listCategory);
router.get('/:id', auth, listCategoryById);
// router.post('/', );
router.post('/', auth, createCategory);

module.exports = router;