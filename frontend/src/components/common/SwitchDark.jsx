import * as React from 'react';
import { motion } from 'framer-motion';

export default function SwitchDark() {
  // guardamos en el localstorage
  const body = document.querySelector('body');
  const lightTheme = 'light';
  const darkTheme = 'dark';
  let theme;
  if (localStorage) {
    theme = localStorage.getItem('theme');
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  // Para que funcione el boton
  const [isDark, setIsDark] = React.useState(false);
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  const toggleDarkMode = () => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem('theme', 'light');
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem('theme', 'dark');
      theme = darkTheme;
    }
    setIsDark(!isDark);
  };

  return (
    <button type="button" className="switch-dark" data-ison={isDark} onClick={toggleDarkMode}>
      <motion.div className="handle-dark" layout transition={spring} />
    </button>
  );
}
