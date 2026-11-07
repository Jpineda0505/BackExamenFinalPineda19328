const estadoServicio = require('../servicios/estado.servicio');
const { responderExito } = require('../utilidades/respuesta');

const obtenerEstado = async (req, res) => {
  const estadoSistema = await estadoServicio.verificarEstadoSistema();
  responderExito(res, estadoSistema, 'Estado del sistema obtenido correctamente');
};

module.exports = { obtenerEstado };
