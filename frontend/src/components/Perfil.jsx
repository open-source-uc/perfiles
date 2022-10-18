import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getPublicUserInfo } from '../utils/auth';

import Badge from './common/Badge';

export default function Perfil() {
  const [user, setUser] = React.useState(null);
  const { username } = useParams();

  useEffect(() => {
    getPublicUserInfo(username)
      .then(setUser);
  }, [username]);

  const formattedJoinedAt = new Date(user?.joinedAt).toLocaleDateString('es-CL');

  return (
    <section className="personal-profile">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={user?.profile?.avatarURL} alt="Foto de perfil" />
        </div>
        <div className="profile-info">
          <h1>{user?.profile?.name}</h1>
          <p>
            Entró el
            {' '}

            <date dateTime={user?.joinedAt}>{formattedJoinedAt}</date>
            . Nivel
            {' '}
            {user?.stats?.level}
            .
          </p>
        </div>
      </div>
      <h1>Logros</h1>
      <article className="badge-article">
        {user?.achievements?.map((logro) => (
          <Badge
            id={logro.achievement.id}
            key={logro.achievement.id}
            name={logro.achievement.name}
            description={logro.achievement.description}
            imageURL={logro.achievement.imageURL}
            level={logro.achievement.level}
            isHighlighted={false}
          />
        ))}
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
