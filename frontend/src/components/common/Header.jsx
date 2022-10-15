import * as React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      {/* Logo */}
      <a href="/" className="logo">
        {/* TODO: */}
        <img src="./assets/images/logo.svg" alt="Perfiles OSUC" />
      </a>
      {/* Navbar */}
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
            <Link to="/logros.html">🏅 Logros</Link>
          </li>
          <li>
            <Link to="/estatutos.html">📖 Estatutos</Link>
          </li>
          <li>
            {/* TODO: */}
            <a href="https://github.com/login/oauth/authorize?client_id=77a88aaa5e4cd67cff18">
              👩‍💻 Iniciar sesión
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
