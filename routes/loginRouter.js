const express = require('express');

const { verifyLoginFieldIsRequired,
  verifyLoginFieldIsEmpty } = require('../middlewares/validate');

const { login } = require('../controllers/loginController');

const router = express.Router();

// router.get('/', listUser);
// router.post('/', );
router.post('/', verifyLoginFieldIsRequired, verifyLoginFieldIsEmpty, login);
// router.delete('/', );

module.exports = router;