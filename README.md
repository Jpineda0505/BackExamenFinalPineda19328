# backFinal — API REST

API REST base en Node.js 20 con Express, Knex y soporte para Oracle 23c y MySQL 8.

---

## Requisitos

- Node.js >= 20
- npm >= 10
- Docker (para correr la BD en local)

---

## Correr en local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 3. Iniciar en modo desarrollo
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

---

## Levantar bases de datos con Docker

### Oracle 23c Free

```bash
docker run -d \
  --name oracle-free \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=miPassword \
  -v oracle-data:/opt/oracle/oradata \
  gvenzl/oracle-free
```

Esperar ~2 min hasta que el contenedor esté listo (`docker logs -f oracle-free`).  
Configurar en `.env`:

```env
DB_CLIENT=oracledb
DB_USER=system
DB_PASSWORD=miPassword
DB_CONNECT=localhost:1521/FREEPDB1
```

### MySQL 8

```bash
docker run -d \
  --name mysql8 \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=miPassword \
  -e MYSQL_DATABASE=backfinal \
  mysql:8
```

Configurar en `.env`:

```env
DB_CLIENT=mysql2
DB_USER=root
DB_PASSWORD=miPassword
DB_HOST=localhost
DB_PORT=3306
DB_NAME=backfinal
```

---

## Scripts disponibles

| Script | Descripcion |
|---|---|
| `npm run dev` | Inicia con nodemon (recarga automatica) |
| `npm start` | Inicia en produccion |
| `npm run migrar` | Ejecuta migraciones pendientes |
| `npm run crear-migracion -- nombre` | Crea una nueva migracion |
| `npm run sembrar` | Ejecuta todas las semillas |

---

## Endpoint de estado

```
GET /api/estado
```

Respuesta cuando la BD esta conectada:

```json
{
  "exito": true,
  "datos": {
    "servidor": "activo",
    "baseDatos": "conectada"
  },
  "mensaje": "Estado del sistema obtenido correctamente"
}
```

---

## App Settings necesarias en Azure App Service

Configurar en **Configuration > Application settings**:

| Clave | Valor de ejemplo | Descripcion |
|---|---|---|
| `NODE_ENV` | `production` | Entorno de ejecucion |
| `PORT` | `8080` | Azure lo inyecta automaticamente |
| `DB_CLIENT` | `oracledb` o `mysql2` | Driver a usar |
| `DB_USER` | `tu_usuario` | Usuario de la BD |
| `DB_PASSWORD` | `tu_password` | Contrasena de la BD |
| `DB_CONNECT` | `host:1521/FREEPDB1` | Solo para Oracle |
| `DB_HOST` | `tu-servidor.mysql.database.azure.com` | Solo para MySQL |
| `DB_PORT` | `3306` | Solo para MySQL |
| `DB_NAME` | `nombre_bd` | Solo para MySQL |
| `CORS_ORIGIN` | `https://tu-front.azurestaticapps.net` | Origen(es) permitidos |

> Azure App Service (Linux, Node 20 LTS) ya inyecta `PORT` automaticamente;
> no es necesario fijarlo manualmente, pero incluirlo no causa problemas.

---

## Estructura del proyecto

```
src/
  app.js                        Configura Express, middlewares y rutas
  servidor.js                   Levanta el servidor HTTP
  configuracion/
    baseDatos.js                Instancia Knex con postProcessResponse
  rutas/
    index.js                    Monta todas las rutas bajo /api
    estado.rutas.js
  controladores/
    estado.controlador.js
  servicios/
    estado.servicio.js
  middlewares/
    manejadorErrores.js
    rutaNoEncontrada.js
  utilidades/
    respuesta.js                responderExito / responderError
    manejadorAsincrono.js       Wrapper para controllers async
bd/
  migraciones/
  semillas/
knexfile.js
.env.example
```
