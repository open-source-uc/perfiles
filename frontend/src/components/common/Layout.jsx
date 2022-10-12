import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Scrollup from './Scrollup';

function Layout() {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
        <Scrollup />
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
