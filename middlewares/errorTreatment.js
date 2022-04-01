// dica do Renato Bispo, 15A;
// dica do Zambs para refatorar o switch em notação de objeto;
const errorMessages = require('../helpers/errorMessages');

module.exports = (error, _req, res, _next) => {
  const statusCode = errorMessages[error.code] || 500;
  
  return res.status(statusCode).json({ message: error.message });
};

// para chegar aqui é passado uma string para ser traduzida em código http, para não ferir o principio do msc, com a individualidade das camadas. o código http só é traduzido na linha 6 em código(number)