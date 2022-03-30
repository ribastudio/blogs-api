const Joi = require('@hapi/joi');

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  userSchema,
};

//  posição 0 do array do joi type 

// name joi.min(3).length.required()