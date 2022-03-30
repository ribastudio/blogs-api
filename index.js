const express = require('express');

const bodyParser = require('body-parser');
const  = require('./routes/productRoutes');
const  = require('./routes/salesRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/posts', postRouter);
app.use('/category', categoryRouter);

app.listen(3000, () => console.log('ouvindo porta 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
