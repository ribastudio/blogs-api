const express = require('express');

const { addUser } = require('../controllers/userController');

const router = express.Router();

// router.get('/', listUser);
// router.post('/', );
router.get('/', addUser);
// router.delete('/', );

module.exports = router;