import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Scrollup from '../common/Scrollup';
import AdminSidebar from './NavAdmin';
import { RequireAdmin } from '../../utils/auth';

export default function Layout() {
  return (
    <RequireAdmin>
      <Helmet>
        <title>Panel Administrativo 👩‍💻 | Members OSUC</title>
      </Helmet>
      <Header />
      <main>
        <AdminSidebar />
        <Outlet />
        <Scrollup />
      </main>
      <Footer />
    </RequireAdmin>
  );
}
