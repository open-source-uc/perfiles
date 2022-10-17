import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <Logo alt="Perfiles OSUC" className="logo-osuc" />
      </Link>
      <Navbar />
    </header>
  );
}
