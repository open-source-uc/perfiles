<h1 align="center">
  <br>
  <a href=#><img src="https://osuc.dev/img/min-icon.svg" width="200px" alt="OSUC Logo "></a>
</h1>

<h4 align="center">Plataforma de integrantes de OSUC.</h4>

<p align="center">
     <!-- Badges Here -->
</p>

<p align="center">
  <a href="#Descripción">Descripción</a> •
  <a href="#Uso">Uso</a> •
  <a href="#Contribuir">Contribuir</a> •
  <a href="#Recursos-adicionales">Recursos</a>
</p>

---

## Descripción

Este repositorio contiene el código fuente para la plataforma comunitaria de [Open Source UC](https://osuc.dev). La plataforma permite que integrantes de la organización creen perfiles y obtengan logros, entre otras cosas.

## Comentarios (Entrega 2)
- En algunos casos, se opta por utilizar métodos `PUT` y `PATCH` en reemplazo de `POST` para actualizar recursos, ya que se considera que es más semántico. Por ejemplo, en el caso de aprobar una solicitud de logro, se utiliza `PATCH /requests/:id/` en vez de `POST /achievements/:id/approve`.
- Se optó por no implementar un skill tree completo en React (dado a dificultades con el manejo de estado), en vez optando por una vista de grilla de logros, por esta entrega.
- A pesar de no ser necesario, se implementó un sistema de autenticación en base a OAuth de GitHub y autorización mediante [JSON Web Tokens](https://jwt.io/).
- Se optó por usar [Prisma](https://www.prisma.io/) como ORM en vez de Sequelize.

## Uso

El repositorio contiene un Dev Container de VSCode, que prepara un entorno de desarrollo listo con PostgreSQL, dependencias y herramientas avanzadas de debugging para tanto el frontend como el backend.

Para usarlo, debes tener instalada de la extensión de [Dev Containers]( https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Luego, puedes abrir el proyecto en VSCode, abrir el archivo `devcontainer.json` y presionar el botón de `Reopen in Container` en la esquina inferior derecha de la ventana.

Una vez abierto en el contenedor, se instalará PostgreSQL en el entorno y se instalarán las dependencias de tanto el front, como el back, al igual que se ejecutará la creación de tablas y la carga de datos de prueba (seed) de la base de datos. En caso de no estar usando el contenedor, esto puede hacerse manualmente de la siguiente manera:

```bash
# Instalar dependencias
cd backend && npm install && npx prisma migrate reset
cd ../frontend && npm install
```

### Entorno

Una vez instaladas las dependencias y preparada la base de datos, es necesario configurar las variables de entorno. Para esto, hay que crear un archivo `.env` en la carpeta backend, en base al `.env.template`. Es necesario proveer el ID y secreto de GitHub para hacer funcionar el OAuth localmente, al igual que un secreto JWT (aleatorio) que gestione la emisión de tokens.

Para obtener tokens de GitHub (en caso de que no se te hayan otorgado de antemano), puedes seguir [este tutorial](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app). Para desarrollo local, es necesario configurar `http://127.0.0.1:3000/api/auth/callback` como `Authorization Callback URL`.

El secreto JWT puede ser generado de la siguiente manera (usando [OpenSSL](https://www.openssl.org/), aunque cualquier otro generador de tokens aleatorios sirve):

```bash
# Generar un secreto aleatorio
openssl rand -hex 32
```

### Ejecución

Finalmente, configurado el entorno, se puede ejecutar el proyecto de la siguiente manera mediante las tareas incluidas de VSCode (en la pestaña Run and Debug), o bien ejecutar manualmente:

```bash
# Ejecutar el backend:
cd backend && npm run dev
# En otro terminal, ejecutar el frontend:
cd frontend && npm start
```
### Migraciones
En caso de querer generar migraciones despues de un cambio de schema o de pullear nuevas migraciones, es necesario correr: `npx prisma migrate dev`. Esto sirve para tanto crear nuevas migraciones automáticamente en base a modificaciones en el schema, como para aplicar migraciones que hayan sido creadas por otros miembros del equipo.

### Autenticación y autorización
Si es que la variable `NODE_ENV` está definida como `development` (puesta por defecto en el contenedor), se puede acceder a las rutas de debugging de autorización, que permiten asumir el rol de cualquier usuario, con tal de probar las distintas rutas. Por ejemplo:

- Para acceder como Fernando (coordinador): http://localhost:3000/api/auth/debug/login?username=fernandosmither
- Para acceder como Agustín (miembro): http://localhost:3000/api/auth/debug/login?username=agucova

### Prisma
Las entidades en el proyecto se encuentran modeladas usando un schema de Prisma, que puede ser encontrado en `backend/prisma/schema.prisma`. Este schema se compila continuamente para generar el cliente de Prisma y un archivo de especificación [DBML](https://www.dbml.org/home/) que permite, entre otras cosas, [generar diagramas del esquema](https://dbdiagram.io) de la base de datos. Este archivo se encuentra en `backend/prisma/schema.dbml`.

Adicionalmente, Prisma provee un "Studio" que permite inspeccionar los datos en la base de datos. Para abrirlo, se puede correr `npx prisma studio`.

## Documentación adicional
Los endpoints de la API [se encuentran ejemplificados en Postman](https://www.postman.com/agucova/workspace/eb248033-d0b2-4760-8638-8ba92f420b42/collection/18674839-9d3d4c46-87f6-4df9-9f03-d9f3ff6f17b4?action=share&creator=18674839).

## Contribuir

> El workflow es PR a development -> Revisar preview y checks -> Asignar reviewers -> Aprobación -> Merge a development

La información detallada sobre cómo contribuir se puede encontrar en [contributing.md](contributing.md).

### Bug Reports & Feature Requests

Utiliza las **issues** para informar cualquier bug o solicitud.

## Recursos adicionales

Además de este repo, se incluyen algunos recursos adicionales:

- [Wireframes](https://www.figma.com/file/yaM1qmubPm9Uy92E2MCrI7/Mock-ups)
- [Mock-up de Landing](https://www.figma.com/file/lGAFeFU1kSXCeEmchjH3Go/Landing-Page)
- [Flujo de miembros](https://www.figma.com/file/v88a4QTAT3G3LkCUNjSYU5/Flujo-de-Miembros)
- [Entidad/Relación](https://www.figma.com/file/xokpKRa9Wuvo90PYIsIioE/E%2FR-OSUC-Profiles)

## Mantenedores

- [agucova](https://www.github.com/agucova)
- [diegocostares](https://www.github.com/diegocostares)
- [fernandosmither](https://www.github.com/fernandosmither)
- [a-maccormack](https://www.github.com/a-maccormack)
