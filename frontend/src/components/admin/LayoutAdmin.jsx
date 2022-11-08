import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Scrollup from '../common/Scrollup';
import AdminSidebar from './NavAdmin';
import { isLoggedIn } from '../../utils/auth';

import UserContext from '../../contexts/userContext';

export default function Layout() {
  async function adminCheck(navigate) {
    if (!isLoggedIn()) {
      // Redirect to /api/auth/login
      navigate('/api/auth/login');
    }
    // Get user info and confirm user is an admin
    const user = React.useContext(UserContext);
    if (!(['CHAIR', 'SERVICE'].includes(user.role))) {
      navigate('/');
    }
  }
  // Check if the user is logged in and is an admin
  const navigate = useNavigate();

  useEffect(() => {
    adminCheck(navigate);
  }, []);

  return (
    <RequireAdmin>
      <Helmet>
        <title>Panel Administrativo 👩‍💻 | Members OSUC</title>
      </Helmet>
      <Header />
      <AdminSidebar />
      <Outlet />
      <Scrollup />
      <Footer />
    </main>
  );
}
