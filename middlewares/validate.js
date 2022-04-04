const CustomError = require('../helpers/customError');
const { userSchema } = require('../schemas/userSchema');
const { postSchema } = require('../schemas/postSchema');
const { listArrayCategoryById } = require('../services/categoryService');

const verifyUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  
  // verifica se os dados estao no formato correto
  const { error } = await userSchema.validate({ displayName, email, password, image });

  if (error) {
    const customError = new CustomError('INVALID_PROPERTY', error.details[0].message);
    console.log(error.details[0].message);
    next(customError);
  }
  next();
};

const verifyLoginFieldIsRequired = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    console.log(!email);
    const customError = new 
      CustomError('INVALID_PROPERTY', `${!email ? '"email"' : '"password"'} is required`);
    return next(customError);
  }
  
  next();
};

const verifyLoginFieldIsEmpty = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    const customError = new 
      CustomError('INVALID_PROPERTY', 
      `${!email ? '"email"' : '"password"'} is not allowed to be empty`);
    return next(customError);
  }

  next();
};

const verifyPost = async (req, _res, next) => {
  const { title, content } = req.body;
  
  // verifica se os dados estao no formato correto
  const { error } = await postSchema.validate({ title, content });
  console.log('error do Joi', error);

  if (error) {
    const customError = new CustomError('INVALID_PROPERTY', error.details[0].message);
    console.log(error.details[0].message);
    next(customError);
  }
  next();
};

const verifyCategories = async (req, _res, next) => {
  const { categoryIds } = req.body;
    
  try {
    if (!categoryIds) {
      throw new CustomError('INVALID_FIELDS', '"categoryIds" is required');
    }
    const resultIdsArray = await listArrayCategoryById(categoryIds);
    console.log('resultIdsArray', resultIdsArray);
      
    if (categoryIds.length !== resultIdsArray.length || !categoryIds) {
      throw new CustomError('INVALID_FIELDS', '"categoryIds" not found');
    } 
    
    next();
  } catch (error) {
    next(error);
  }
};

// https://dmitripavlutin.com/check-if-object-has-property-javascript/
const verifyIfHaveCategory = async (req, _res, next) => {
  const { body } = req;
  try {
    if ('categoryIds' in body) {
      throw new CustomError('INVALID_PROPERTY', 'Categories cannot be edited');
    } 
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyUser,
  verifyLoginFieldIsRequired,
  verifyLoginFieldIsEmpty,
  verifyPost,
  verifyCategories,
  verifyIfHaveCategory,
};