const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');

const jwtConfig = {
  expiresIn: '7d',
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

const verifyIfHaveAToken = async (authorization) => {
  try {
    if (authorization) {
      return authorization;
    }
  } catch (error) {
    throw new CustomError('INVALID_AUTH', 'Token not found');
  }
};

module.exports = {
  genAuthToken,
  verifyAuth,
  verifyIfHaveAToken,
};