require('dotenv').config();
const app = require('./app');

const PUERTO_PREDETERMINADO = 3000;
const puerto = process.env.PORT || PUERTO_PREDETERMINADO;

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Driver BD: ${process.env.DB_CLIENT || 'oracledb'}`);
});
