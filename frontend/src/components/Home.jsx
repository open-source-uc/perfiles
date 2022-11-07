import * as React from 'react';
import axios from 'axios';
import LoadingAnimation from './common/LoadingAnimation';
import ProfileCard from './common/ProfileCard';
import handleError from '../utils/error-handler';

import { getAuthHeader } from '../utils/auth';

export default function Home() {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Metodo de filtrado
  let displayedMembers = users;
  if (search) {
    displayedMembers = users.filter(
      (user) => user.profile.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  React.useEffect(() => {
    // Get all users
    axios.get('/api/public/members', {
      headers: getAuthHeader(),
    }).then((response) => {
      setUsers(response.data);
      setLoading(false);
      document.title = 'Inicio | Members OSUC';
    }).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section id="welcome-hero">
        <div className="prose dark:prose-invert mx-auto my-8">
          <h1 className="">Bienvenide a la plataforma de integrantes de OSUC.</h1>
          <p className="">
            Aquí podrás encontrar los perfiles de les integrantes de Open Source
            UC, sus logros y biografías. Si deseas ser parte de esta comunidad, ve
            los detalles en la
            {' '}
            <a href="/inscripciones">guía rapida de inscripción.</a>
          </p>
        </div>
      </section>
      { loading && (
      <LoadingAnimation />
      ) }
      { error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      { !error && !loading && (
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
            {displayedMembers.map((user) => (
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
      )}
    </>
  );
}
