const { INVALID_PROPERTY } = require('../helpers/errorMessage');
const CustomError = require('../helpers/customError');
const { userSchema } = require('../schemas/userSchema');

const verifyUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
 
  const { error } = await userSchema.validate({ displayName, email, password, image });

  if (error) {
    const customError = new CustomError(INVALID_PROPERTY, error.details[0].message);
    next(customError);
  }
  next();
};

module.exports = {
  verifyUser,
};