# Documentación API

La API está diseñada para comportarse de forma RESTful mediante JSON, y utiliza autorización vía [JSON Web Tokens](https://jwt.io/) para proteger las rutas de miembros y administradores. Los tokens son emitidos tras una autenticación exitosa via el OAuth de GitHub y deben ser adjuntados a las peticiones mediante el header `Authorization` como `Bearer <token>`.

La API restringe acceso mediante un sistema de control de acceso basado en roles. Los roles se encuentran descritos en el schema de la base de datos, que se puede encontrar en [`backend/prisma/schema.prisma`](../backend/prisma/schema.prisma).

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
- `DEL`: Permite eliminar una solicitud de logro.

### 👤🆕 Endpoints de aplicantes (`/applicants`)
#### 🔐 `/applicants`
- 🔐 `GET`: Devuelve un listado de todos los aplicantes.

#### 🔐 `/applicants/report`
- 🔐 `GET`: Retorna un CSV con los datos y estadísticas de todos los aplicantes.
