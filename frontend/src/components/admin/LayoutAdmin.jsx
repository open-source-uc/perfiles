import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Scrollup from '../common/Scrollup';
import AdminSidebar from './NavAdmin';
import { RequireAdmin } from '../../utils/auth';

export default function Layout() {
  return (
    <RequireAdmin>
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
