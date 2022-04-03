const loginService = require('../services/loginService');
const userService = require('../services/userService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    await userService.ifUserExists({ email });
    console.log('antes de gerar o token');
    const loginData = await loginService.genAuthToken({ email, password });
    console.log('depois de gerar o token', loginData);
    return res.status(200).json({ token: loginData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};