import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingAnimation from './common/LoadingAnimation';
import ProfileCard from './common/ProfileCard';
import handleError from '../utils/error-handler';

import { getAuthHeader } from '../utils/auth';

function WelcomeHero() {
  return (
    <section id="welcome-hero">
      <div className="prose dark:prose-invert mx-auto my-8">
        <h1>👋 Bienvenide a la plataforma de integrantes de OSUC.</h1>
        <p>
          Aquí podrás encontrar los perfiles de les integrantes de Open Source
          UC, sus logros y biografías. Si deseas ser parte de esta comunidad, ve
          los detalles en la
          {' '}
          <Link to="/inscripciones">
            <span className="font-semibold ">guía rapida de inscripción.</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

function RoleDisplay({ members, memberRole, sectionTitle }) {
  const filteredMembers = members.filter((m) => m.role === memberRole);
  return (
    <section className="mb-8">
      <h2 className="text-center mb-4 text-2xl font-semibold dark:text-white">
        {sectionTitle}
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        {
        filteredMembers.map(
          (user) => (
            <ProfileCard
              name={user.profile.name}
              title={user.profile.title}
              username={user.username}
              key={user.username}
            />
          ),
        )
      }
      </div>
    </section>
  );
}

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
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/public/members`, {
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
      <WelcomeHero />
      { loading && (
      <LoadingAnimation />
      ) }
      { error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      { !error && !loading && (
      <div className="mx-auto">
        <section className="text-center mb-8">
          <p className="text-xl font-semibold mt-8">🔍 Buscar integrantes</p>
          <input
            type="text"
            name="name"
            className="text-lg text-center rounded-md text-gray-800 w-full max-w-lg my-2"
            placeholder="Escribe un nombre..."
            value={search}
            onChange={searcher}
          />
        </section>
        <RoleDisplay
          members={displayedMembers}
          memberRole="CHAIR"
          sectionTitle="Coordinación"
        />
        <RoleDisplay
          members={displayedMembers}
          memberRole="MEMBER"
          sectionTitle="Integrantes"
        />
        <RoleDisplay
          members={displayedMembers}
          memberRole="ALUMNI"
          sectionTitle="Alumni"
        />
      </div>
      )}
    </>
  );
}
