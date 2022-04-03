const express = require('express');

const { verifyUser } = require('../middlewares/validate');

const authMiddleware = require('../middlewares/authLogin');

const { addUser, listUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', listUser);
// router.post('/', );
router.post('/', verifyUser, addUser);
// router.delete('/', );

module.exports = router;