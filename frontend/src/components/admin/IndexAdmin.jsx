import * as React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/userContext';

export default function IndexAdmin() {
  const user = React.useContext(UserContext);
  return (
    <div className="admin__main prose dark:prose-invert">
      {/* <!-- adminindexbox1--> */}
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <Link to="/admin/">Admin</Link>
        </li>
      </ol>
      <p className="admin__welcome">
        Bienvenido/a,
        {' '}
        {user?.profile?.name}
        {' '}
        👋
      </p>
      <h2>Actividad reciente</h2>
      <table className="tableadmin">
        <tbody>
          <tr>
            <td>
              Agustin Covarrubias actualizó su perfil.
              <time>Hace 4 minutos.</time>
            </td>
          </tr>
          <tr>
            <td>
              Diego Costa cargó 15 aplicantes.
              {' '}
              <time>Hace 8 minutos.</time>
            </td>
          </tr>
          <tr>
            <td>
              Lucas Natero creó un nuevo evento.
              {' '}
              <time>Hace 1 hora.</time>
            </td>
          </tr>
          <tr>
            <td>
              Fernando Smith entregó un logro a Martin Atria.
              <time>Hace 3 dias.</time>
            </td>
          </tr>
          <tr>
            <td>
              Bárbara Irarrázaval entregó un logro a Nicolás Berríos.
              <time>Hace 5 dias.</time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
