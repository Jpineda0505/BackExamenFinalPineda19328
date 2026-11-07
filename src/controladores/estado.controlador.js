const estadoServicio = require('../servicios/estado.servicio');
const { responderExito } = require('../utilidades/respuesta');

const obtenerEstado = async (req, res) => {
  const estadoSistema = await estadoServicio.verificarEstadoSistema();
  responderExito(res, estadoSistema, 'Estado del sistema obtenido correctamente');
};

const obtenerEstadoBaseDatos = async (req, res) => {
  const estadoBd = await estadoServicio.obtenerEstadoBaseDatos();
  responderExito(res, estadoBd, 'Estado de la base de datos obtenido correctamente');
};

const obtenerEstadoFront = async (req, res) => {
  const estadoFront = await estadoServicio.verificarDisponibilidadFront();
  responderExito(res, estadoFront, 'Estado del front obtenido correctamente');
};

const obtenerInfoSistema = (req, res) => {
  const infoSistema = estadoServicio.obtenerInfoSistema();
  responderExito(res, infoSistema, 'Informacion del sistema obtenida correctamente');
};

module.exports = {
  obtenerEstado,
  obtenerEstadoBaseDatos,
  obtenerEstadoFront,
  obtenerInfoSistema,
};
