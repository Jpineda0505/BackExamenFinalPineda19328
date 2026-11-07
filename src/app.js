require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rutasApi = require('./rutas/index');
const manejadorErrores = require('./middlewares/manejadorErrores');
const rutaNoEncontrada = require('./middlewares/rutaNoEncontrada');

const app = express();

const origenesPermitidos = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origen) => origen.trim())
  : ['http://localhost:5173'];

app.use(helmet());
app.use(cors({ origin: origenesPermitidos, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', rutasApi);

app.use(rutaNoEncontrada);
app.use(manejadorErrores);

module.exports = app;
