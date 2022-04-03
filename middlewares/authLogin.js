const loginService = require('../services/loginService');
const CustomError = require('../helpers/customError');

const authentication = async (req, res, next) => {
  const { authorization } = req.header;
  
  if (!authorization) {
    throw new CustomError('INVALID_AUTH', 'Token not found');
  }

  try {
    const loginData = await loginService.verifyAuth(authorization);
    const user = loginData.data.email;
    
    req.user = user;
    
    return res.status(200).json({ message: loginData.token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
};
