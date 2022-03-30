const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const login = async (userData) => {
  let user = await User();

  const { password, ...userWithouthPassword } = user;

  const token = jwt.sign({ data: userWithouthPassword }, process.env.JWT_SECRET, jwtConfig);

  return { token };
};

module.exports = {
  login,
};