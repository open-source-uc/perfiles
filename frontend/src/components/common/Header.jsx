import * as React from 'react';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header>
      <a href="/" className="logo">
        <Logo alt="Perfiles OSUC" className="logo-osuc" />
      </a>
      <Navbar />
    </header>
  );
}
