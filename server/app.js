const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/practicum_final', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}, k byeBYE!`);
});
