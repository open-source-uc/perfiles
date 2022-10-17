import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isAdmin } from '../../utils/auth';

export default function ProfileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuVariants = {
    opened: {
      display: 'block',
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.03,
      },
    },
    closed: {
      display: 'none',
    },
  };

  const linkVariants = {
    opened: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <>
      <motion.img
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.8 }}
        className="login-picture"
        src="https://avatars.githubusercontent.com/barbaraim?s=120"
        alt="profile"
        onClick={() => setIsOpen(!isOpen)}
      />

      <motion.ul
        className="profile-dropdown"
        initial={false}
        variants={menuVariants}
        animate={isOpen ? 'opened' : 'closed'}
      >
        <motion.li variants={linkVariants}><Link to="/perfil">👤 Perfil</Link></motion.li>
        {isAdmin() && (
          <motion.li variants={linkVariants}><Link to="/admin">👨‍💻 Admin</Link></motion.li>
        )}
        <motion.li variants={linkVariants}><Link to="/logout">🚪 Cerrar sesión</Link></motion.li>
      </motion.ul>
    </>
  );
}
