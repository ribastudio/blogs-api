const Joi = require('@hapi/joi');

const postSchema = Joi.object().keys({
  title: Joi.string().min(8).required(),
  content: Joi.string().required(),
  // categoryIds: Joi.array().min(1).required(),
});

module.exports = {
  postSchema,
};