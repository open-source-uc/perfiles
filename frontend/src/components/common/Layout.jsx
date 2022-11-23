import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Scrollup from './Scrollup';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="mt-20 flex-grow">
        <Outlet />
        <Scrollup />
      </main>
      <Footer />
    </div>
  );
}
