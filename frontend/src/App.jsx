import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/common/Layout';

import About from './components/About';
import Dashboard from './components/Dashboard';
import Estatutos from './components/Estatutos';
import Home from './components/Home';
import Inscripciones from './components/Inscripciones';
import Logros from './components/Logros';
import NoMatch from './components/NoMatch';
import Perfil from './components/Perfil';
import ConfigAdmin from './components/admin/ConfigAdmin';
import IndexAdmin from './components/admin/IndexAdmin';
import LogrosAdmin from './components/admin/LogrosAdmin';
import RRHHAdmin from './components/admin/RRHHAdmin';
import LayoutAdmin from './components/admin/LayoutAdmin';

import { removeToken, storeTokenIfGiven } from './utils/auth';

export default function App() {
  // Check if the URL contains a JWT token and save it in localStorage
  if (storeTokenIfGiven()) {
    // Remove the token from the URL
    window.history.replaceState({}, document.title, '/');
  }
  // Check if the logout parameter is present in the URL
  if (window.location.search.includes('logout')) {
    // Remove the token from localStorage
    removeToken();
    // Remove the logout query parameter from the URL
    window.history.replaceState({}, document.title, '/');
  }
  return (
    <div>
      {
        /* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */
      }
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="estatutos" element={<Estatutos />} />
          <Route path="inscripciones" element={<Inscripciones />} />
          <Route path="logros" element={<Logros />} />
          <Route path="perfil" element={<Perfil />} />

          {
            /* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */
          }
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<IndexAdmin />} />
          <Route path="/admin/config" element={<ConfigAdmin />} />
          <Route path="/admin/logros" element={<LogrosAdmin />} />
          <Route path="/admin/rrhh" element={<RRHHAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}
