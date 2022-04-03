const loginService = require('../services/loginService');
const CustomError = require('../helpers/customError');

const authentication = async (req, _res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  try {
    if (!authorization) {
      throw new CustomError('INVALID_AUTH', 'Token not found');
    }
    const result = await loginService.verifyIfHaveAToken(authorization);
    console.log(result);
    const loginData = await loginService.verifyAuth(authorization);
    const user = loginData.data.email;
    
    req.user = user;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
