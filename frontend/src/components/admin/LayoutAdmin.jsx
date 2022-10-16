import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Scrollup from '../common/Scrollup';
import NavAdmin from './NavAdmin';
import { isLoggedIn, getUserInfo } from '../../utils/auth';

async function adminCheck(navigate) {
  if (!isLoggedIn()) {
    // Redirect to /api/auth/login
    navigate('/api/auth/login');
  }
  // Get user info and confirm user is an admin
  const user = await getUserInfo();
  if (!(['CHAIR', 'SERVICE'].includes(user.role))) {
    navigate('/');
  }
}
export default function Layout() {
  // Check if the user is logged in and is an admin
  const navigate = useNavigate();

  useEffect(() => {
    adminCheck(navigate);
  }, []);

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
