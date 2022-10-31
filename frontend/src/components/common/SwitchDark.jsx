import * as React from 'react';
import { motion } from 'framer-motion';

export default function SwitchDark() {
  const darkModeDefault = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Para que funcione el boton
  const [isDark, setIsDark] = React.useState(darkModeDefault);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <button type="button" className="switch-dark" data-ison={isDark} onClick={() => setIsDark(!isDark)}>
      <motion.div className="handle-dark" layout transition={spring} />
    </button>
  );
}
