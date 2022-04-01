// const { INVALID_PROPERTY } = require('../helpers/errorMessages');
const CustomError = require('../helpers/customError');
const { userSchema } = require('../schemas/userSchema');

const verifyUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
 
  const { error } = await userSchema.validate({ displayName, email, password, image });

  if (error) {
    const customError = new CustomError('INVALID_PROPERTY', error.details[0].message);
    next(customError);
  }
  next();
};

const verifyLoginFieldIsRequired = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    console.log(!email);
    const customError = new 
      CustomError('INVALID_PROPERTY', `${!email ? 'email' : 'password'} is required`);
    return next(customError);
  }

  // const { error } = await loginSchema.validate({ email, password });

  // if (error) {
  //   const customError = new CustomError('INVALID_PROPERTY', error.details[0].message);
  //   next(customError);
  // }
  
  next();
};

const verifyLoginFieldIsEmpty = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    const customError = new 
      CustomError('INVALID_PROPERTY', 
      `${!email ? 'email' : 'password'} is not allowed to be empty`);
    return next(customError);
  }

  // const { error } = await loginSchema.validate({ email, password });

  // if (error) {
  //   const customError = new CustomError('INVALID_PROPERTY', error.details[0].message);
  //   next(customError);
  // }
  
  next();
};

module.exports = {
  verifyUser,
  verifyLoginFieldIsRequired,
  verifyLoginFieldIsEmpty,
};