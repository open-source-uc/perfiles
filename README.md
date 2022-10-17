<h1 align="center">
  <br>
  <a href=#><img src="https://osuc.dev/img/min-icon.svg" width="200px" alt="banner"></a>
</h1>

<h4 align="center"> Repositorio web para la comunidad OSUC. </h4>

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

## Uso

Primero que todo hay que abrir el repositorio en el devcontainer, que se encarga de preparar el entorno de desarrollo, incluyendo PostgreSQL.

### .env

Hay que crear un archivo `.env` en la raíz del proyecto, en base al `.env.template`. Es necesario proveer el ID y secreto de GitHub para hacer funcionar el OAuth localmente, al igual que un secreto JWT (aleatorio) que gestione la emisión de tokens.

### Para el Back-end
- Ejecutar `cd backend`
- Ejecutar `npm install`
- Ejecutar `npx prisma migrate reset` para crear las tablas y cargar el seed.
- Ejecutar `npm run start` para ejecutar el backend
- Opcionalmente, se puede correr `npx prisma studio` para visualizar los datos post-seed.

### Migraciones
En caso de querer generar migraciones despues de un cambio de schema o de pullear nuevas migraciones, es necesario correr: `npx prisma migrate dev`

### Para el Front-end

- Ejecutar `cd frontend`
- Ejecutar `npm install`

### Autenticación
Si es que la variable `NODE_ENV` está definida como `development`, se puede acceder a las rutas de debugging de autenticación, que permiten asumir el rol de cualquier usuario, con tal de probar las distintas rutas. Por ejemplo:

- Para acceder como Fernando (coordinador): http://localhost:3000/api/auth/debug/login?username=fernandosmither
- Para acceder como Agustín (miembro): http://localhost:3000/api/auth/debug/login?username=agucova

## Supuestos (Entrega 1)

* Para correr el código, se sugiere utilizar la extensión "Live Server" de Vscode mencionada en una ayudantía, para evitar tener problemas con los paths al abrir directamente una vista.

* Al darle al botón "Iniciar Sesión" realmente se está haciendo un llamado al autenticador de GitHub (el cual solo pide permisos de lectura, no se recolectarán datos). Esto significa que al autorizar el login, se hará una redirección automática a [Nuestro dominio oficial](https://perfiles.osuc.dev) para las vistas de admin. A pesar de que este deploy es exactamente el de nuestra branch `main`, se puede volver a local simplemente yendo a `/admin/index.html`.

### Contribuir

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
