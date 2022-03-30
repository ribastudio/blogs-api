const Joi = require('@hapi/joi');

const categoriesSchema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  categoriesSchema,
};