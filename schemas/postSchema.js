const Joi = require('@hapi/joi');

const postSchema = Joi.object().keys({
  title: Joi.string().min(8).required(),
  content: Joi.string().required(),
  categoryIds: Joi.number().required(),
});

module.exports = {
  postSchema,
};