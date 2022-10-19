/* eslint-disable no-unused-vars */
import * as React from 'react';

export default function ProfileCard({ name, title, username }) {
  return (
    <div className="profile">
      <img className="profile__avatar" src={`https://avatars.githubusercontent.com/${username}?s=120`} alt={name} />
      <p className="profile__name">{name}</p>
      <p className="profile__title">{title}</p>
    </div>
  );
}
