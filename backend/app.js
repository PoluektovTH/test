require('@babel/register');
require('dotenv').config();
const express = require('express');
const config = require('./config/serverConfig');
const app = express();

const mainRouter = require('./routes/main.routes');

const PORT = process.env.PORT ?? 3000;
config(app);

app.use('/pics', mainRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
