const { Router } = require('express');
const {
  obtenerEstado,
  obtenerEstadoBaseDatos,
  obtenerEstadoFront,
  obtenerInfoSistema,
} = require('../controladores/estado.controlador');
const manejarAsincrono = require('../utilidades/manejadorAsincrono');

const enrutador = Router();

enrutador.get('/base-datos', manejarAsincrono(obtenerEstadoBaseDatos));
enrutador.get('/front', manejarAsincrono(obtenerEstadoFront));
enrutador.get('/sistema', obtenerInfoSistema);
enrutador.get('/', manejarAsincrono(obtenerEstado));

module.exports = enrutador;
