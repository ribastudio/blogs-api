// dica do Renato Bispo, 15A
const {
  ENTITY_ALREADY_EXISTS,
  ENTITY_FAILED,
  INVALID_PROPERTY,
} = require('../helpers/errorMessage');

module.exports = (error, _req, res, _next) => {
  let statusCode = null;
  console.log(error.code);
  switch (error.code) {
    case ENTITY_FAILED:
      statusCode = 404;
      break;

    case ENTITY_ALREADY_EXISTS:
      statusCode = 404;
      break;

    case INVALID_PROPERTY:
      statusCode = 400;
      break;
  
    default:
      statusCode = 500;
      break;
  }

  return res.status(statusCode).json({ message: error.message });
};