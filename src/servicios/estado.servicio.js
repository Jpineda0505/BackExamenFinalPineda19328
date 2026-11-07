const baseDatos = require('../configuracion/baseDatos');

const ESTADO_SERVIDOR_ACTIVO = 'activo';
const ESTADO_BD_CONECTADA = 'conectada';
const ESTADO_BD_SIN_CONEXION = 'sin conexion';

/**
 * Prueba la conexion intentando adquirir una conexion del pool.
 * Funciona con Oracle y MySQL sin SQL especifico de motor.
 * @returns {Promise<boolean>} estaConectada
 */
const verificarConexionBaseDatos = async () => {
  let conexion;
  try {
    conexion = await baseDatos.client.acquireConnection();
    return true;
  } catch {
    return false;
  } finally {
    if (conexion) baseDatos.client.releaseConnection(conexion);
  }
};

/**
 * Retorna el estado del servidor y de la base de datos.
 * Si la BD falla, igual responde 200 para que el front pueda mostrarlo.
 * @returns {Promise<{servidor: string, baseDatos: string}>}
 */
const verificarEstadoSistema = async () => {
  const estaConectada = await verificarConexionBaseDatos();
  return {
    servidor: ESTADO_SERVIDOR_ACTIVO,
    baseDatos: estaConectada ? ESTADO_BD_CONECTADA : ESTADO_BD_SIN_CONEXION,
  };
};

module.exports = { verificarEstadoSistema };
