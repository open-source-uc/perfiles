import * as React from 'react';

function Home() {
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
          />
        </section>
        <section id="profiles">
          <h2>Coordinación</h2>
          <div id="coordination-profiles" className="profile__list" />
          <h2>Integrantes</h2>
          <div id="members-profiles" className="profile__list" />

          <h2>Sala de la fama 🏆</h2>
          <div id="hall-of-fame-profiles" className="profile__list" />
        </section>
      </section>
    </div>
  );
}

export default Home;
