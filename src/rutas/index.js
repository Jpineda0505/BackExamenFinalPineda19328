const { Router } = require('express');
const estadoRutas = require('./estado.rutas');

const enrutador = Router();

enrutador.use('/estado', estadoRutas);

module.exports = enrutador;
