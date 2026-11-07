const baseDatos = require('../configuracion/baseDatos');
const { version } = require('../../package.json');

const ESTADO_SERVIDOR_ACTIVO = 'activo';
const ESTADO_BD_CONECTADA = 'conectada';
const ESTADO_BD_SIN_CONEXION = 'sin conexion';
const TIMEOUT_FRONT_MS = 5000;

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

/**
 * Verifica la conexion a la BD midiendo el tiempo de respuesta.
 * No expone credenciales ni host; solo el motor configurado.
 * @returns {Promise<{estaConectada: boolean, motor: string, tiempoRespuestaMs: number, mensaje: string}>}
 */
const obtenerEstadoBaseDatos = async () => {
  const motor = process.env.DB_CLIENT || 'oracledb';
  const inicio = Date.now();
  const estaConectada = await verificarConexionBaseDatos();
  const tiempoRespuestaMs = Date.now() - inicio;

  return {
    estaConectada,
    motor,
    tiempoRespuestaMs,
    mensaje: estaConectada ? 'Conexion exitosa' : 'No se pudo conectar a la base de datos',
  };
};

/**
 * Verifica la disponibilidad del front haciendo fetch desde el servidor.
 * Usa la primera URL de CORS_ORIGIN; timeout de 5 s.
 * @returns {Promise<{estaDisponible: boolean, codigoHttp: number|null, tiempoRespuestaMs: number}>}
 */
const verificarDisponibilidadFront = async () => {
  const urlFront = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',')[0].trim();
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_FRONT_MS);
  const inicio = Date.now();

  try {
    const respuesta = await fetch(urlFront, { method: 'GET', signal: controlador.signal });
    clearTimeout(temporizador);
    return {
      estaDisponible: respuesta.status < 500,
      codigoHttp: respuesta.status,
      tiempoRespuestaMs: Date.now() - inicio,
    };
  } catch {
    clearTimeout(temporizador);
    return {
      estaDisponible: false,
      codigoHttp: null,
      tiempoRespuestaMs: Date.now() - inicio,
    };
  }
};

/**
 * Retorna metadatos del sistema: version, entorno, motor y uptime del proceso.
 * @returns {{version: string, entorno: string, motor: string, uptimeSegundos: number}}
 */
const obtenerInfoSistema = () => ({
  version,
  entorno: process.env.NODE_ENV || 'development',
  motor: process.env.DB_CLIENT || 'oracledb',
  uptimeSegundos: Math.floor(process.uptime()),
});

module.exports = {
  verificarEstadoSistema,
  obtenerEstadoBaseDatos,
  verificarDisponibilidadFront,
  obtenerInfoSistema,
};
