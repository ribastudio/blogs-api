const express = require('express');

const { verifyUser } = require('../middlewares/validate');

const auth = require('../middlewares/authLogin');

const { addUser, listUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', auth, listUser);
// router.post('/', );
router.post('/', verifyUser, addUser);
// router.delete('/', );

module.exports = router;