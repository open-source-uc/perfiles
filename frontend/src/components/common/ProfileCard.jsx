/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProfileCard({ name, title, username }) {
  const redirectProfile = () => {
    window.location.href = `/perfil/${username}`;
  };

  // variant from animation
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 0,
      transition: {
        type: 'linear',
        bounce: 0.1,
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      onClick={redirectProfile}
    >
      <motion.div
        className="profile cursor-grab"
        variants={cardVariants}
        whileHover={{ scale: 1.07, transition: { duration: 0.2 } }}
      >
        <img className="profile__avatar" src={`https://avatars.githubusercontent.com/${username}?s=120`} alt={name} />
        <p className="profile__name">{name}</p>
        <p className="profile__title">{title}</p>
      </motion.div>
    </motion.div>
  );
}
