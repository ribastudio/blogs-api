// const CustomError = require('../helpers/customError');
// const { ENTITY_FAILED } = require('../helpers/errorMessages');
const CustomError = require('../helpers/customError');
const { User } = require('../models');
// const userSchema = require('../schemas/userSchema');

const addUser = async (userData) => {
  const { displayName, email, password, image } = userData;

  const ifUserExists = await User.findOne({ where: { email: userData.email } });
    
  if (ifUserExists) {
    throw new CustomError('USER_EXISTS', 'User already registered');
  }
 
  const result = await User.create({ displayName, email, password, image });
  // verificar erro do sequelize, que não retorna erro para o controller se o nome já existir.
  return { result };
};

const ifUserExists = async (userData) => {
  const user = await User.findOne({ where: { email: userData.email } });
  console.log('user dentro do genAuthToken', user);

  if (!user || user.email !== userData.email) {
    throw new CustomError('INVALID_FIELDS', 'Invalid fields');
  }
};

const listUser = async () => {
  const result = await User.findAll();
  console.log(result);
  return result;
};

const listUserById = async (id) => {
  const result = await User.findByPk(id);
  if (!result) {
    throw new CustomError('ENTITY_FAILED', 'User does not exist');
  }
  return result;
};

const deleteUser = async (email) => {
  const result = await User.destroy({ where: { email } });
  return result;
};

module.exports = {
  addUser,
  ifUserExists,
  listUser,
  listUserById,
  deleteUser,
};