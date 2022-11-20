/* eslint-disable no-unused-vars */
import React from 'react';

function BadgeCard({
  name, image, hasAchievement, width = 'w-40', height = 'h-48', textSize = 'text-m',
}) {
  return (
    <article className={`${width} ${height} rounded-xl shadow-xl bg-white px-6 flex flex-col justify-center ${hasAchievement ? 'border-indigo-500 border-4' : ''}`}>
      <img className={`${width}`} src={`/${image}`} alt={name} />
      <p className={`text-gray-800 ${textSize} font-semibold text-center leading-tight`}>{name}</p>
    </article>
  );
}

export default BadgeCard;
