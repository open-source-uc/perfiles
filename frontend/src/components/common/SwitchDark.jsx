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
    <button type="button" className={`w-16 h-10 flex content-center rounded-full p-1 bg-osuc-black-1 dark:bg-osuc-navyblue mx-2 ${isDark ? 'justify-end' : 'justify-start'}`} onClick={() => setIsDark(!isDark)}>
      <motion.div className="handle-dark w-8 h-8 block bg-osuc-white-3 rounded-full shadow-sm shadow-black" layout transition={spring} />
    </button>
  );
}
