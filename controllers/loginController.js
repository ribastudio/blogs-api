const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const loginData = await loginService.makeLogin({ email, password });
    return res.status(200).json({ message: loginData.token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};