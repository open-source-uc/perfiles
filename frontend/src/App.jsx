import * as React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/common/Layout';

import Estatutos from './components/Estatutos';
import Home from './components/Home';
import Inscripciones from './components/Inscripciones';
import Logros from './components/Logros';
import NoMatch from './components/NoMatch';
import Perfil from './components/Perfil';
import Leaderboard from './components/Leaderboard';
import ConfigAdmin from './components/admin/ConfigAdmin';
import IndexAdmin from './components/admin/IndexAdmin';
import LogrosAdmin from './components/admin/LogrosAdmin';
import RRHHAdmin from './components/admin/RRHHAdmin';
import LayoutAdmin from './components/admin/LayoutAdmin';
import Solicitudes from './components/Solicitudes';
import Proyectos from './components/Proyectos';

import { removeToken, storeTokenIfGiven } from './utils/auth';

// Contexts
import UserContext from './contexts/userContext';

export default function App() {
  // JWT MANAGEMENT
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

  // USER MANAGEMENT
  // Check if the user is logged in
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/members/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="estatutos" element={<Estatutos />} />
          <Route path="inscripciones" element={<Inscripciones />} />
          <Route path="logros" element={<Logros />} />
          <Route path="perfil/:username" element={<Perfil />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<IndexAdmin />} />
          <Route path="/admin/config" element={<ConfigAdmin />} />
          <Route path="/admin/logros" element={<LogrosAdmin />} />
          <Route path="/admin/rrhh" element={<RRHHAdmin />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserContext.Provider>
  );
}
