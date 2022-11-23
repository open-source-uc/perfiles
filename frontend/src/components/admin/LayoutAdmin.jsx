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
    <div className="flex flex-col h-screen">
      <RequireAdmin>
        <Helmet>
          <title>Panel Administrativo 👩‍💻 | Members OSUC</title>
        </Helmet>
        <AdminSidebar />
        <Header />
        <main className="p-2 pb-4 ml-16 mt-20 flex flex-grow flex-col justify-between ">
          <Outlet />
          <Scrollup />
        </main>
        <Footer />
      </RequireAdmin>
    </div>
  );
}
