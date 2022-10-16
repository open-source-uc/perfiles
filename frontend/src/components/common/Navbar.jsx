import * as React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

export default function Navbar() {
  let button;
  if (isLoggedIn()) {
    button = <Link to="/api/auth/login">👩‍💻 Iniciar sesión</Link>;
  } else {
    button = <Link to="/?logout=yes">👩‍💻 Cerrar sesión</Link>;
  }
  return (
    <nav className="nav-main">
      <label htmlFor="check" className="checkbtn">
        <i className="fa-solid fa-bars" />
        <input type="checkbox" id="check" />
      </label>
      <ul>
        <li>
          <button className="switchtheme" type="button" id="switchtheme">
            <span>
              {' '}
              <i className="fa-solid fa-sun" />
              {' '}
            </span>
            <span>
              {' '}
              <i className="fa-solid fa-moon" />
              {' '}
            </span>
          </button>
        </li>
        <li>
          <Link to="/logros">🏅 Logros</Link>
        </li>
        <li>
          <Link to="/estatutos">📖 Estatutos</Link>
        </li>
        <li>
          {button}
        </li>
      </ul>
    </nav>
  );
}
