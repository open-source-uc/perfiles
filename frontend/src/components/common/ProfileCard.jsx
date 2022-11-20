/* eslint-disable no-unused-vars */
import * as React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ name, title, username }) {
  const navigate = useNavigate();
  const redirectProfile = () => {
    navigate(`/perfil/${username}`);
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
        className="flex flex-col items-center justify-center w-[200px] h-[240px] shadow-xl cursor-grab bg-neutral-100 dark:bg-slate-200 rounded-xl cursor-pointer"
        variants={cardVariants}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <img className="w-[100px] h-[100px] rounded-full object-cover mb-2" src={`https://avatars.githubusercontent.com/${username}?s=120`} alt={name} />
        <p className="text-center font-bold text-lg break-words w-[160px]  text-slate-800">{name}</p>
        <p className="text-center break-words w-[180px] text-slate-700 text-md">{title}</p>
      </motion.div>
    </motion.div>
  );
}
