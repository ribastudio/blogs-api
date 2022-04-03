const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const genAuthToken = async (userData) => {
  const { id, email } = userData;
  const token = jwt.sign({ data: { id, email } }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const verifyAuth = async (authorization) => {
  try {
    const auth = jwt.verify(authorization, process.env.JWT_SECRET);
    return auth;
  } catch (error) {
    throw new CustomError('INVALID_AUTH', 'Expired or invalid token');
  }
};

module.exports = {
  genAuthToken,
  verifyAuth,
};