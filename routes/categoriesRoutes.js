const express = require('express');

// const { verifyUser } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const { createCategory } = require('../controllers/categoriesController');

const router = express.Router();

// router.get('/', auth, listUser);
// router.get('/:id', auth, listUserById);
// router.post('/', );
router.post('/', auth, createCategory);
// router.delete('/', );

module.exports = router;