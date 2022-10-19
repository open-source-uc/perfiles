import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Scrollup from './Scrollup';

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Scrollup />
      <Footer />
    </main>
  );
}
