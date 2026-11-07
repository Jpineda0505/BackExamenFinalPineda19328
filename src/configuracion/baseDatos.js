require('dotenv').config();
const knex = require('knex');
const knexfile = require('../../knexfile');

const entorno = process.env.NODE_ENV || 'development';
const configuracionBase = knexfile[entorno];

/**
 * Oracle devuelve columnas en MAYUSCULAS; esto las normaliza a minusculas
 * para que el resto del codigo use siempre snake_case minusculo.
 */
const convertirKeysAMinusculas = (valor) => {
  if (Array.isArray(valor)) return valor.map(convertirKeysAMinusculas);
  if (valor !== null && typeof valor === 'object') {
    return Object.fromEntries(
      Object.entries(valor).map(([clave, contenido]) => [clave.toLowerCase(), contenido])
    );
  }
  return valor;
};

const configuracion = {
  ...configuracionBase,
  postProcessResponse: (resultado) => convertirKeysAMinusculas(resultado),
};

const baseDatos = knex(configuracion);

module.exports = baseDatos;
