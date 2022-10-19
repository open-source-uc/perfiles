import * as React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';
import ProfileNav from './ProfileNav';
import SwitchDark from './SwitchDark';

export default function Navbar() {
  let button;
  if (!isLoggedIn()) {
    button = <a href="/api/auth/login">👩‍💻 Iniciar sesión</a>;
  } else {
    button = <ProfileNav />;
  }
  return (
    <nav className="nav-main">
      <label htmlFor="check" className="checkbtn">
        <i className="fa-solid fa-bars" />
        <input type="checkbox" id="check" />
      </label>
      <ul className="text-white dark:text-white">
        <li>
          <SwitchDark />
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
