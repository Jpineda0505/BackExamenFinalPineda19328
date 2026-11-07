const { Router } = require('express');
const { obtenerEstado } = require('../controladores/estado.controlador');
const manejarAsincrono = require('../utilidades/manejadorAsincrono');

const enrutador = Router();

enrutador.get('/', manejarAsincrono(obtenerEstado));

module.exports = enrutador;
