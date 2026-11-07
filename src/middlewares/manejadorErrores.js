const { responderError } = require('../utilidades/respuesta');

const ESTADO_ERROR_INTERNO = 500;
const ENTORNO_PRODUCCION = 'production';
const MENSAJE_GENERICO = 'Error interno del servidor';

const manejadorErrores = (error, req, res, next) => {
  const codigoEstado = error.status || error.statusCode || ESTADO_ERROR_INTERNO;
  const esProduccion = process.env.NODE_ENV === ENTORNO_PRODUCCION;

  const mensaje = esProduccion ? MENSAJE_GENERICO : error.message;
  const errores = esProduccion ? [] : [error.stack];

  responderError(res, mensaje, codigoEstado, errores);
};

module.exports = manejadorErrores;
