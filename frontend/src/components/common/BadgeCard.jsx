/* eslint-disable no-unused-vars */
import React from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

function buttonClicked(e) {
  // eslint-disable-next-line no-console
  console.log('button clicked');
  e.stopPropagation();
}

function BadgeCard({
  name, image, hasAchievement, width = 'w-40', height = 'h-48', textSize = 'text-m',
}) {
  return (
    <article className={`${width} ${height} rounded-xl shadow-xl bg-white px-6 flex flex-col justify-center ${hasAchievement ? 'border-indigo-500 border-4' : ''}`}>
      <button type="submit" className="absolute w-6 fill-yellow-500 top-2 left-[8rem]" onClick={(e) => buttonClicked(e)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
      </button>
      <img className={`${width}`} src={`/${image}`} alt={name} />
      <p className={`text-gray-800 ${textSize} font-semibold text-center leading-tight`}>{name}</p>
    </article>
  );
}

export default BadgeCard;
