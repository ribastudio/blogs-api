const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const makeLogin = async (userData) => {
  const user = await User.findOne({ where: { email: userData.email } });

  if (!user || user.email !== userData.email) {
    throw new CustomError('INVALID_FIELDS', 'Invalid fields');
  }

  const { password, ...userWithouthPassword } = user;

  const token = jwt.sign({ data: userWithouthPassword }, process.env.JWT_SECRET, jwtConfig);

  return { token };
};

module.exports = {
  makeLogin,
};