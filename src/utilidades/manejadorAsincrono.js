/**
 * Envuelve un controlador async para pasar errores al manejador de Express
 * sin necesidad de try/catch en cada controlador.
 */
const manejarAsincrono = (controlador) => (req, res, next) => {
  Promise.resolve(controlador(req, res, next)).catch(next);
};

module.exports = manejarAsincrono;
