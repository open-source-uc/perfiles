import * as React from 'react';
import { Link } from 'react-router-dom';

export default function NavAdmin() {
  return (
    <aside className="nav-admin">
      <nav className="nav-admin__nav" aria-label="Navegación de Admin">
        <ul className="nav-admin__ul">
          <li><Link to="/admin">📈</Link></li>
          <li><Link to="/admin/rrhh.html">👥</Link></li>
          <li><Link to="/admin/logros.html">🏅</Link></li>
          <li className="active"><Link to="/admin/config.html">⚙️</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
