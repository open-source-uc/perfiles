# Documentación API

La API está diseñada para comportarse de forma RESTful mediante JSON, y utiliza autorización vía [JSON Web Tokens](https://jwt.io/) para proteger las rutas de miembros y administradores. Los tokens son emitidos tras una autenticación exitosa via el OAuth de GitHub y deben ser adjuntados a las peticiones mediante el header `Authorization` como `Bearer <token>`.

La API restringe acceso mediante un sistema de control de acceso basado en roles. Los roles se encuentran descritos en el schema de la base de datos, que se puede encontrar en [`backend/prisma/schema.prisma`](../backend/prisma/schema.prisma).

Es importante notar que en modo desarrollo, se accede a la API mediante un middleware de proxy que se encuentra en [`frontend/src/setupProxy.js`](../frontend/src/setupProxy.js). Esto permite que el frontend pueda acceder a la API sin necesidad de configurar CORS, e implica que los pedidos a la API se hacen a `http://localhost:3000/api` en lugar de `http://localhost:3100/` (nótese el prefijo).

## Tests
Junto con la API se provee un conjunto de tests REST para [Thunder Client](https://www.thunderclient.com/). Para correrlos, se necesita abrir el repositorio con la extensión instalada, crear un nuevo Environment para guardar las variables temporales, ejecutar al menos un test de prueba y luego se pueden ejecutar todos los tests de la colección.

Los tests aprovechan el sistema de autorización de desarrollo para poder probar las rutas de la API sin necesidad de autenticarse manualmente.

Estos tests son demostrativos de los flujos comunes de la API, pero no son exhaustivos.
## Endpoints
### ℹ️ Endpoints básicos (`/`)
#### `/`
- `GET`: Devuelve un mensaje de bienvenida (Hello, world!).

#### `/health`
- `GET`: Evalúa la salud de la API y la base de datos, devolviendo `200`/`OK` si todo está bien, o `500`/`ERROR` si algo falla.

### 🌐 Endpoints públicos (`/public`)
#### `/public/members`
- `GET`: Devuelve un listado de todos los miembros de la organización, incluyendo sus perfiles y logros.

#### `/public/members/:username`
- `GET`: Devuelve el perfil de un miembro de la organización, incluyendo sus logros.

#### `/public/achievements`
- `GET`: Devuelve un listado de todos los logros públicos (no misteriosos).

### 👥 Endpoints de miembros (`/members`)
#### 🔒 `/members/me`
- `GET`: Devuelve un perfil completo del usuario, junto a sus logros conseguidos.

#### 🔒 `/members/me/stats`
- `GET`: Devuelve los puntos y nivel del usuario.

#### 🔐 `/members/:username`
- `GET`: Devuelve un perfil completo de un miembro de la organización, junto a sus logros conseguidos.
- `PATCH`: Permite modificar selectivamente sus atributos mediante una descripción parcial de los nuevos atributos.

#### 🔐 `/members/:username/stats`
- `GET`: Devuelve los puntos y nivel de un miembro de la organización.

#### 🔐 `/members/import`
- `PUT`: Permite importar un listado de nuevos miembros a la organización, especificando sus roles y otros atributos. A diferencia de otras rutas, recibe un archivo CSV `file` en el body de la petición, en lugar de un JSON.

### 🏅 Endpoints de logros (`/achievements`)
#### 🔐 `/achievements`
- `GET`: Devuelve un listado de todos los logros, incluyendo los misteriosos.
- `PUT`: Permite crear un nuevo logro, especificando sus atributos.

#### 🔐 `/achievements/:id`
- `GET`: Devuelve un logro específico.
- `DEL`: Permite eliminar un logro.

### 📂 Endpoints de solicitudes (`/requests`)
#### 🔐 `/requests`
- 🔐 `GET`: Devuelve un listado de todas las solicitudes de logros.
- 🔒 `PUT`: Permite crear una nueva solicitud de logro, especificando sus atributos.

#### 🔐 `/requests/:id`
- `GET`: Devuelve una solicitud de logro específica.
- `PATCH`: Permite aprobar o rechazar una solicitud de logro, especificando su estado (`approve`).
- `DEL`: Permite eliminar una solicitud de logro.



### 👤🆕 Endpoints de aplicantes (`/applicants`)
#### 🔐 `/applicants`
- 🔐 `GET`: Devuelve un listado de todos los aplicantes.

#### 🔐 `/applicants/report`
- 🔐 `GET`: Retorna un CSV con los datos y estadísticas de todos los aplicantes.
