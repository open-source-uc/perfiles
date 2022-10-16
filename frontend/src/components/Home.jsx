import * as React from 'react';
import axios from 'axios';
import ProfileCard from './common/ProfileCard';

export default function Home() {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const apiGet = async () => {
    const response = await axios.get('/api/members');
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
      (user) => user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  React.useEffect(() => {
    apiGet();
  });

  return (
    <div>
      <section id="welcome-hero">
        <h1>Bienvenide a la plataforma de perfiles OSUC</h1>
        <p>
          Aquí podrás encontrar los perfiles de les integrantes de Open Source
          UC, sus logros y biografías. Si deseas ser parte de esta comunidad, ve
          los detalles en la
          <a href="/inscripciones.html"> guía rapida de inscripción.</a>
        </p>
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
          <h2>Coordinación</h2>
          <div id="coordination-profiles" className="profile__list">
            {/* Generamos varias ProfileCard con los datos */}
            {displayedMembers.map((user) => (
              // Revisamos que el user.role sea coordinator
              user.role === 'COORDINATOR' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>
          <h2>Integrantes</h2>
          <div id="members-profiles" className="profile__list">
            {displayedMembers.map((user) => (
              user.role === 'MEMBER' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>

          <h2>Sala de la fama 🏆</h2>
          <div id="hall-of-fame-profiles" className="profile__list">
            {displayedMembers.map((user) => (
              user.role === 'ALUMNI' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>

        </section>
      </section>
    </div>
  );
}
