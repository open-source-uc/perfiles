import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Scrollup from '../common/Scrollup';
import NavAdmin from './NavAdmin';

export default function Layout() {
  return (
    <main>
      <Header />
      <NavAdmin />
      <Outlet />
      <Scrollup />
      <Footer />
    </main>
  );
}
