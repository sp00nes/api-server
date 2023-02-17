'use strict';

const express = require('express');
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const logger = require('./middleware/logger.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(clothesRouter);
app.use(foodRouter);
app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('Server Online');
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log());
};

module.exports = { start, app };
