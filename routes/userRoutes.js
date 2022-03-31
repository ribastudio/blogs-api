const express = require('express');

const { verifyUser } = require('../middlewares/validate');

const { addUser } = require('../controllers/userController');

const router = express.Router();

// router.get('/', listUser);
// router.post('/', );
router.put('/', verifyUser, addUser);
// router.delete('/', );

module.exports = router;