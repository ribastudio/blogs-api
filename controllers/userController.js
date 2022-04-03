const userService = require('../services/userService');
const loginService = require('../services/loginService');

const addUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  
  try {
    console.log(displayName, email, password, image);
       
    const createdUser = await userService.addUser({ displayName, email, password, image });
    console.log('passou do sequelize', createdUser);
    
    const token = await loginService.genAuthToken(createdUser);
    
    console.log('generateToken', token);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const listUser = async (req, res, next) => {
  // const { displayName, email, password, image } = req.body;
  try {
    const userList = await userService.listUser();
    return res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  listUser,
};