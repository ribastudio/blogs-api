const express = require('express');

const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoriesRoutes');
const middlewareError = require('./middlewares/errorTreatment');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
// app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use(middlewareError);

app.listen(3000, () => console.log('ouvindo porta 3000'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
