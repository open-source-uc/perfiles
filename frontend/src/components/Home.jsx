import * as React from 'react';
import ProfileCard from './common/ProfileCard';

export default function Home() {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const apiGet = async () => {
    const response = await fetch('../assets/members.json');
    const data = await response.json();
    setUsers(data);
  };

  // Funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Metodo de filtrado
  let result = [];
  if (!search) {
    result = users;
  } else {
    result = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
  }

  React.useEffect(() => {
    apiGet();
  }, []);

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
            {result.map((user) => (
              // Revisamos que el user.role sea coordinator
              user.role === 'coordinator' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>
          <h2>Integrantes</h2>
          <div id="members-profiles" className="profile__list">
            {result.map((user) => (
              user.role === 'member' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>

          <h2>Sala de la fama 🏆</h2>
          <div id="hall-of-fame-profiles" className="profile__list">
            {result.map((user) => (
              user.role === 'alumni' && (
                ProfileCard(user.name, user.title, user.username)
              )
            ))}
          </div>

        </section>
      </section>
    </div>
  );
}
