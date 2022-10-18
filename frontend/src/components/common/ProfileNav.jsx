import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import UserContext from '../../contexts/userContext';

export default function ProfileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = React.useContext(UserContext);

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
    <div>
      <motion.img
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.8 }}
        className="login-picture"
        src={user?.profile?.avatarURL}
        alt="Foto de Perfil"
        onClick={() => setIsOpen(!isOpen)}
      />

      <motion.ul
        className="profile-dropdown"
        initial={false}
        variants={menuVariants}
        animate={isOpen ? 'opened' : 'closed'}
      >
        <motion.li variants={linkVariants}><Link to={`/perfil/${user?.username}`}>👤 Perfil</Link></motion.li>
        {['CHAIR', 'SERVICE'].includes(user?.role) && (
        <motion.li variants={linkVariants}><Link to="/admin">👨‍💻 Admin</Link></motion.li>
        )}
        <motion.li variants={linkVariants}><a href="/?logout=true">🚪 Cerrar sesión</a></motion.li>
      </motion.ul>
    </div>
  );
}
