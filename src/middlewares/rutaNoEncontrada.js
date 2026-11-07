const { responderError } = require('../utilidades/respuesta');

const ESTADO_NO_ENCONTRADO = 404;

const rutaNoEncontrada = (req, res) => {
  responderError(
    res,
    `Ruta ${req.method} ${req.url} no encontrada`,
    ESTADO_NO_ENCONTRADO
  );
};

module.exports = rutaNoEncontrada;
