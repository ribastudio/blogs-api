// const CustomError = require('../helpers/customError');
// const { ENTITY_FAILED } = require('../helpers/errorMessages');
const { User } = require('../models');
// const userSchema = require('../schemas/userSchema');

const addUser = async (userData) => {
  const { displayName, email, password, image } = userData;
  
  // if (displayName === 'ribamarjose') {
  //   throw new CustomError('ENTITY_FAILED', 'User already registered');
  // }
  
  const result = await User.create({ displayName, email, password, image });
 
  return { result };
};

const listUser = async () => {
  const result = await User.listAll();

  return { result };
};

module.exports = {
  addUser,
  listUser,
};