const loginService = require('../services/loginService');
const userService = require('../services/userService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    await userService.ifUserExists({ email });
    const loginData = await loginService.genAuthToken({ email, password });
    return res.status(200).json({ token: loginData.token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};