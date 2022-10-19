/* eslint-disable no-unused-vars */
import React from 'react';

function Badge({
  id, name, description, imageURL, level, isHighlighted,
}) {
  return (
    <a className="badge-container badge-container-empty" href="#-" id={id}>
      <div className="badge-image-container">
        <img className={isHighlighted ? 'highlighted' : ''} alt={description} src={`/${imageURL}`} />
      </div>
      <div className="badge-info-container">
        <div className="badge-title">
          {name}
        </div>
      </div>
    </a>
  );
}

export default Badge;
