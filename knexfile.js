require('dotenv').config();

const DB_CLIENT = process.env.DB_CLIENT || 'oracledb';

const CONFIGURACION_COMUN = {
  pool: { min: 0, max: 10 },
  migrations: {
    directory: './bd/migraciones',
    tableName: 'migraciones_historial',
    extension: 'js',
  },
  seeds: {
    directory: './bd/semillas',
  },
};

const seleccionarConexion = () => {
  if (DB_CLIENT === 'mysql2') {
    return {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    };
  }

  return {
    client: 'oracledb',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT,
    },
  };
};

const configuracion = {
  ...seleccionarConexion(),
  ...CONFIGURACION_COMUN,
};

module.exports = {
  development: configuracion,
  production: configuracion,
};
