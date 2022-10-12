import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/common/Layout';

import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';

export default function App() {
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

          {
            /* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */
          }
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
