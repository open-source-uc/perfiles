/* eslint-disable no-unused-vars */
import React from 'react';

function BadgeCard({ name, image, hasAchievement }) {
  return (
    <article className={`w-[160px] h-[190px] rounded-xl shadow-xl bg-white px-6 flex flex-col justify-center ${hasAchievement ? 'border-indigo-500 border-4' : ''}`}>
      <img className="w-[160px]" src={image} alt={name} />
      <p className="text-gray-800 text-m font-semibold text-center leading-tight">{name}</p>
    </article>
  );
}

export default BadgeCard;
