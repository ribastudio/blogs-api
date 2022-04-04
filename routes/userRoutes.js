const express = require('express');

const { verifyUser } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const { addUser,
        listUser,
        listUserById,
        deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', auth, listUser);
router.get('/:id', auth, listUserById);
router.post('/', verifyUser, addUser);
router.delete('/me', auth, deleteUser);

module.exports = router;