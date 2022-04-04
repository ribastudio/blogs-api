const express = require('express');

const { verifyLoginFieldIsRequired,
  verifyLoginFieldIsEmpty } = require('../middlewares/validate');

const { login } = require('../controllers/loginController');

const router = express.Router();

router.post('/', verifyLoginFieldIsRequired, verifyLoginFieldIsEmpty, login);

module.exports = router;