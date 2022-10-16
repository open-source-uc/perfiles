import * as React from 'react';

export default function RRHHAdmin() {
  return (
    <div className="admin__main">
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <a href="/admin/index.html">Admin</a>
        </li>
        <li className="adminindexbox-item active">Recursos humanos</li>
      </ol>
      <section className="admin-box admin-members">
        <h2>Miembros</h2>
        <p className="admin-members-search__title">Buscar miembros...</p>
        <div className="admin-members-search">
          <input type="text" name="name" className="admin-members-search__input" placeholder="Escribe un nombre..." />
          <button className="admin-members-search__button" type="button">
            <i className="fa-solid fa-search" />
            Buscar
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th><span>Nombre</span></th>
              <th><span>Rol</span></th>
              <th><span>Estado</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fernando Smith</td>
              <td>Coordinador</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>Agustín Covarrubias</td>
              <td>Mentor</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>Martín Atria</td>
              <td>Mentor</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>Lucas Natero</td>
              <td>Miembro</td>
              <td>Activo</td>
            </tr>
            <tr>
              <td>Ria Deane</td>
              <td>Integrante</td>
              <td>Inactivo</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="admin-box admin-reports">
        <h2>Generar reportes de actividad</h2>

        <div className="admin-reports-buttons">
          <button type="button">Reporte de aplicantes</button>
          <button type="button">Reporte de outboarding</button>
        </div>
      </section>
      <section className="admin-box admin-import-aplicants">
        <h2>Importar aplicantes</h2>
        <p>
          Los aplicantes recibiran invitaciones a Telegram, Discord, GitHub y
          el sistema de mails de OSUC
        </p>
        <form className="import-members">
          <input type="file" />
          <p>Arrastre sus archivos aquí o haga clic en esta área.</p>
          <button type="submit">Subir</button>
        </form>
      </section>
      <section className="admin-box admin-danger-zone">
        {/* <!-- DANGER ZONE --> */}
        <h2 className="text-danger">Zona de peligro</h2>
        <div className="admin-danger-zone-buttons">
          <button className="btn-danger" type="button">Generar cambio de coordinación</button>
          <button className="btn-danger" type="button">Reiniciar onboarding</button>
        </div>
      </section>
    </div>
  );
}