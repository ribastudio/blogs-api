const express = require('express');

const { verifyUser } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const { addUser, listUser, listUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/', auth, listUser);
router.get('/:id', auth, listUserById);
// router.post('/', );
router.post('/', verifyUser, addUser);
// router.delete('/', );

module.exports = router;