/* eslint-disable no-unused-vars */
import React from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

function BadgeCard({
  data, hasAchievement, isOpen, setIsOpen, setDataBadge, width = 'w-40', height = 'h-48', textSize = 'text-m',
}) {
  // eslint-disable-next-line no-shadow
  function buttonClicked(e, data) {
    // eslint-disable-next-line no-console
    console.log(data);
    // SI es que isOpen == false, se cambia por...
    setIsOpen(!isOpen);
    setDataBadge(data);

    e.stopPropagation();
  }

  return (
    <article className={`${width} ${height} z-20 rounded-xl px-1 py-1 shadow-xl bg-white flex flex-col justify-between ${hasAchievement ? 'border-indigo-500 border-4' : ''}`}>
      <button
        type="button"
        className="w-6 mx-0 fixed fill-yellow-500  z-10"
        onClick={(e) => buttonClicked(e, data)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path className="absolute inset-0" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
      </button>
      <div className="px-4 py-4">
        <img className={`${width}`} src={`/${data.imageURL}`} alt={data.name} />
        <p className={`text-gray-800 ${textSize} font-semibold text-center leading-tight`}>{data.name}</p>
      </div>
    </article>
  );
}

export default BadgeCard;
