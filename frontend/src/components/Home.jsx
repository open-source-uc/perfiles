import * as React from 'react';
import axios from 'axios';
import ProfileCard from './common/ProfileCard';

import { getAuthHeader } from '../utils/auth';

export default function Home() {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const apiGet = async () => {
    const response = await axios.get('/api/public/members', {
      headers: getAuthHeader(),
    });
    setUsers(response.data);
  };

  // Funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Metodo de filtrado
  let displayedMembers = users;
  if (search) {
    displayedMembers = users.filter(
      // (user) => user.name.toLowerCase().includes(search.toLowerCase()),
      (user) => user.profile.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  React.useEffect(() => {
    apiGet();
  }, []);

  return (
    <div>
      <section id="welcome-hero">
        <div className="prose dark:prose-invert mx-auto my-8">
          <h1 className="">Bienvenide a la plataforma de integrantes de OSUC.</h1>
          <p className="">
            Aquí podrás encontrar los perfiles de les integrantes de Open Source
            UC, sus logros y biografías. Si deseas ser parte de esta comunidad, ve
            los detalles en la
            {' '}
            <a href="/inscripciones.html">guía rapida de inscripción.</a>
          </p>
        </div>
      </section>
      <section id="members">
        <section className="search-members">
          <p className="search-members__title">🔍 Buscar integrantes</p>
          <input
            type="text"
            name="name"
            className="search-members__input"
            placeholder="Escribe un nombre..."
            value={search}
            onChange={searcher}
          />
        </section>
        <section id="profiles">
          <div className="prose dark:prose-invert">
            <h2>Coordinación</h2>
          </div>
          <div id="coordination-profiles" className="profile__list">
            {/* Generamos varias ProfileCard con los datos */}
            {displayedMembers.map((user) => (
              // Revisamos que el user.role sea coordinator
              user.role === 'CHAIR' && (
                <ProfileCard
                  name={user.profile.name}
                  title={user.profile.title}
                  username={user.username}
                  key={user.username}
                />
              )
            ))}
          </div>
          <div className="prose dark:prose-invert">
            <h2>Integrantes</h2>
          </div>
          <div id="members-profiles" className="profile__list">
            {displayedMembers.map((user) => (
              user.role === 'MEMBER' && (
                <ProfileCard
                  name={user.profile.name}
                  title={user.profile.title}
                  username={user.username}
                  key={user.username}
                />
              )
            ))}
          </div>

          <div className="prose dark:prose-invert">
            <h2>Sala de la fama 🏆</h2>
          </div>
          <div id="hall-of-fame-profiles" className="profile__list">
            {displayedMembers.map((user) => (
              user.role === 'ALUMNI' && (
                <ProfileCard
                  name={user.profile.name}
                  title={user.profile.title}
                  username={user.username}
                  key={user.username}
                />
              )
            ))}
          </div>

        </section>
      </section>
    </div>
  );
}
