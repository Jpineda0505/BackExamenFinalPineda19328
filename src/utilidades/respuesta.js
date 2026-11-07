const ESTADO_EXITO = 200;
const ESTADO_ERROR_INTERNO = 500;

const responderExito = (res, datos, mensaje = 'Operacion exitosa', codigoEstado = ESTADO_EXITO) => {
  res.status(codigoEstado).json({
    exito: true,
    datos,
    mensaje,
  });
};

const responderError = (res, mensaje = 'Error interno del servidor', codigoEstado = ESTADO_ERROR_INTERNO, errores = []) => {
  res.status(codigoEstado).json({
    exito: false,
    mensaje,
    errores,
  });
};

module.exports = { responderExito, responderError };
