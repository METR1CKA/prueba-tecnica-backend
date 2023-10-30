# PRUEBA-TECNICA-BACKEND

Prueba Técnica para Backend Developer con experiencia en TypeScript, Express.js y PostgreSQL

- Este proyecto es una API RESTful desarrollada con TypeScript y Express.js que permite realizar consultas geoespaciales en una base de datos PostgreSQL.

## Requisitos

- Node.js o NVM (Node Version Manager)
- PostgreSQL
- TypeScript

> La versión de node.js esta especificada en el archivo [`.nvmrc`](./.nvmrc)

## Instalación

1. Clonar el repositorio: `git clone <url-del-repositorio>`.
2. Dirigirse a la carpeta: `cd prueba-tecnica-backend`.
3. Instalar dependencias: `npm install`.

## Configuración del proyecto

1. Crear un archivo `.env` en la raíz del proyecto en base al archivo [`.env.example`](./.env.example) y configura las variables de entorno, ejemplo:

```env
HOST=0.0.0.0
PORT=3333
NODE_ENV=development
DB_CONNECTION=postgres
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=mypassword
PG_DATABASE=db_prueba_tecnica
```

2. Generar una variable de entorno `APP_KEY`:

`npm run generate:appkey`

## Base de datos

1. Para correr las migraciones de la base de datos, se usa el comando:

`npm run db:migrations`

2. Para llenar la base de datos con los datos de prueba de proveedores, se usa el comando:

`npm run db:seeds`

3. (Opcional) Para el caso de revertir las migraciones, se usa el comando:

`npm run db:rollback`

## Ejecución

1. Correr el comando para modo desarrollo:

`npm run dev`

## Pruebas unitarias

1. Para correr las pruebas unitarias se ejecuta el comando:

`npm test` o `npm run test`

## Endpoints

### Rutas de Autenticación

1. Inicio de sesión: `POST /api/v1/auth/sign-in`

Espera un cuerpo de solicitud con el correo electrónico y la contraseña del usuario.

Ejemplo de cuerpo de solicitud:

```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

2. Registro: `POST /api/v1/auth/sign-up`

Espera un cuerpo de solicitud con el correo electrónico, la contraseña y el nombre de usuario del nuevo usuario.

Ejemplo de cuerpo de solicitud:

```json
{
  "email": "nuevo@example.com",
  "password": "nuevacontraseña123",
  "username": "nuevousuario"
}
```

3. Refrescar token: `POST /api/v1/auth/refresh-token`

Espera un encabezado de autorización con un token invalido. Devolviendo un token nuevo

4. Verificar token: `GET /api/v1/auth/verify-token`

Espera un encabezado de autorización con un token válido.

### Rutas de Proveedores

1. Proveedores cercanos: `GET /api/v1/providers/nearby`

Espera un encabezado de autorización con un token válido y parámetros de consulta con la latitud y longitud del usuario.

Ejemplo de parámetros de consulta:

```
/api/v1/providers/nearby?latitude=19.432683&longitude=-99.133205
```

### Rutas Raíz

1. Raíz: `GET /`

2. API V1: `GET /api/v1`
