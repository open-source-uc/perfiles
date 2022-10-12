import React from 'react';

export default function Perfil() {
  return (
    <section className="personal-profile">
      <div className="profile-header">
        <div className="profile-picture">
          <img src="https://avatars.githubusercontent.com/barbaraim?s=120" alt="barbaraim" />
        </div>
        <div className="profile-info">
          <h1>Bárbara Irarrázaval</h1>
          <p>Entró en 2022. Nivel 17</p>
        </div>
      </div>
      <h1>Logros</h1>
      <article className="badge-article">
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container">
            <img className="badge-image" alt="" src="/assets/images/badges/3.svg" />
          </div>
          <div className="badge-info-container">
            <div className="badge-title">Primera PR</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container">
            <img className="badge-image" alt="" src="/assets/images/badges/1.svg" />
          </div>
          <div className="badge-info-container">
            <div className="badge-title">Tenemos que hablar</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container">
            <img className="badge-image" alt="" src="/assets/images/badges/2.svg" />
          </div>
          <div className="badge-info-container">
            <div className="badge-title">Elon Musk</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container hexagon" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container circle" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container shield" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container hexagon" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container circle" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
        <a className="badge-container badge-container-empty" href="#-">
          <div className="badge-image-container shield" />
          <div className="badge-info-container">
            <div className="badge-title">Insignia aún no obtenida</div>
          </div>
        </a>
      </article>
      <h2>Biografía</h2>
      <blockquote>
        <p>
          &ldquo;Somewhere, something incredible is waiting to be known.&rdquo;
          — Carl Sagan
        </p>
      </blockquote>
      <p>
        I&rsquo;m an engineering student and
        <a href="https://github.com/agucova">open sourcerer</a>
        {' '}
        that does a bit
        of everything, but nothing specially well. I&rsquo;m currently an
        undergraduate majoring in Computer Science Engineering 👨‍💻 at
        <a href="https://www.uc.cl/en">UC Chile</a>
        .
      </p>
      <p>
        I&rsquo;m very passionate about computer science, cybersecurity and
        using tech for social impact. Most of my work is interdisciplinary,
        spanning everything from edtech to metascience, and I&rsquo;ve also been
        involved in public policy, campaigning and consultancy. Lately,
        I&rsquo;ve started to work under the umbrella of the
        <a href="https://www.effectivealtruism.org/">Effective Altruism</a>
        community.
      </p>
      <p>
        I&rsquo;m also the Digital Platforms Lead at
        <a href="https://americatransparente.org/">América Transparente</a>
        , an
        NGO working on enabling government transparency throughout Latin America
        by building open source tools for journalists. I&rsquo;ve also been an
        organizer of
        <a href="https://marchforscience.org/">March for Science</a>
        {' '}
        Chile since
        2017, working to push for better scientific policy in Chile.
      </p>
      <p>
        Along with some friends, I co-founded
        <a href="https://osuc.dev/">Open Source UC</a>
        , an organization that
        brings together students and professors to build awesome open source
        projects.
      </p>
      <p>
        ℹ️ I hold drop-in hours each saturday to talk about Effective Altruism
        and my open source projects. Feel free to
        <a href="https://calendly.com/agucova/drop-in-hours">pass by</a>
        .
      </p>
      <p>My pronouns are he/him.</p>
    </section>

  );
}
