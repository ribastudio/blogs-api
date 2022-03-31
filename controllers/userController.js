const userService = require('../services/userService');

const addUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const addedUser = await userService.addUser({ displayName, email, password, image });
    return res.status(201).json({ token: 'oi' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
};