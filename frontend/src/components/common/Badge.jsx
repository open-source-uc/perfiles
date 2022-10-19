/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function Badge(props) {
  const {
    id, name, description, imageURL, level, isHighlighted,
  } = props;

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
