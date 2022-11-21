import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

import { CalendarDaysIcon, SparklesIcon, StarIcon } from '@heroicons/react/20/solid';
import { getPublicUserInfo } from '../utils/auth';
import handleError from '../utils/error-handler';
import LoadingAnimation from './common/LoadingAnimation';

import { ReactComponent as RobotDCC } from '../assets/images/robot-dcc.svg';
import PopoverCreate from './common/PopoverCreate';

function ProfileInfo({
  user,
}) {
  const formattedJoinedAt = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'long',
  }).format(new Date(user?.joinedAt));

  return (
    <div className="text-center lg:text-left">
      <div>
        <img className="rounded-full mx-auto lg:mx-0" src={user?.profile?.avatarURL} alt="Foto de perfil" />
        <h1 className="font-semibold text-3xl">{user?.profile?.name}</h1>
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        <div className="mb-2">
          <CalendarDaysIcon className="inline-block mr-2" height="20px" />
          <time dateTime={user?.joinedAt}>
            Entró el
            {' '}
            {formattedJoinedAt}
          </time>
        </div>
        <span className="mr-3">
          <StarIcon className="inline-block mr-2" height="20px" />
          {user?.stats?.points}
          {' '}
          Puntos
        </span>
        <span>
          <SparklesIcon className="inline-block mr-2" height="20px" />
          Nivel
          {' '}
          {user?.stats?.level}
        </span>
      </div>
    </div>
  );
}

function UserBio({ userProfile }) {
  if (userProfile) {
    return (
      <>
        <h2 className="text-2xl">Biografía</h2>
        <div className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
              h1: 'h2',
              h2: 'h3',
              h3: 'h4',
              h4: 'h5',
              h5: 'h6',
            }}
          >
            {userProfile}
          </ReactMarkdown>
        </div>
      </>
    );
  }

  return (
    <div className="prose dark:prose-invert md:border-4 md:border-dashed dark:md:border-zinc-300 md:border-zinc-600 p-4 mx-auto">
      <RobotDCC className="max-w-[300px] mx-auto my-0 h-60" alt="No encontrado" />
      <div className="text-center mx-4">
        <p className="font-semibold text-xl">Este usuario no tiene biografía.</p>
        <p>
          Si este perfil es tuyo,
          {' '}
          puedes crear tu perfil de OSUC Members usando
          {' '}
          <a href="https://github.com/open-source-uc/osuc-profile/generate">esta plantilla</a>
          {' '}
          para crear un repositorio llamado
          {' '}
          <code>osuc-profile</code>
          {' '}
          en tu cuenta personal.
        </p>
        <p>
          El archivo
          <code>readme.md</code>
          {' '}
          será cargado aquí.
        </p>
      </div>

    </div>
  );
}

async function getGithubProfile(username) {
  // Fetch the README from the user's GitHub profile
  const repo = 'osuc-profile';
  // We need to try to fetch the README from branches master, main
  // And then query files readme.md, README.md, Readme.md
  const branches = ['main', 'master'];
  const filenames = ['readme.md', 'README.md', 'Readme.md'];

  // This might not seem like the most efficient way to do this,
  // but trust me, it's the best alternative
  // (GraphQL would require authenticating from the back-end, so
  // it would require multiple roundtrips)

  // eslint-disable-next-line no-restricted-syntax
  for (const branch of branches) {
    // eslint-disable-next-line no-restricted-syntax
    for (const filename of filenames) {
      const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filename}`;
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url);
      if (response.ok) {
        return response.text();
      }
    }
  }
  // If we get here, we couldn't find the README
  return null;
}

function Badge({ achievementOnMember }) {
  const { achievement } = achievementOnMember;
  const formattedDate = new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
  }).format(new Date(achievementOnMember.obtainedAt));
  return (
    <PopoverCreate
      button={<img src={`/${achievement.imageURL}`} alt={achievement.name} className="w-16" />}
      header={(
        <>
          <h3>{achievement.name}</h3>
          <h3>{formattedDate}</h3>
        </>
      )}
      body={(
        <>
          <p className="text-xs">{achievement.description}</p>
          <p>
            <StarIcon className="inline-block mr-2 h-5" />
            {achievement.level.points}
            {' '}
            {achievement.level.name}
          </p>
        </>
      )}
    />
  );
}

export default function Perfil() {
  const { username } = useParams();
  const [user, setUser] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    getPublicUserInfo(username)
      .then((response) => {
        if (response.data.username) {
          setUser(response.data);
          setLoading(false);
          document.title = `Perfil de ${response.data.profile.name}`;
        } else {
          setError('No se encontró el usuario');
          setLoading(false);
        }
      }).catch((err) => {
        const errorMsg = handleError(err);
        setError(errorMsg);
        setLoading(false);
      });
    getGithubProfile(username).then((userMD) => {
      setUserProfile(userMD);
    });
  }, [username]);

  return (
    <>
      {loading && !error && (
        <LoadingAnimation />
      )}
      {error && (
        <>
          <h1 className="text-center text-2xl font-bold">{error}</h1>
          <p className="text-center">
            <Link to="/">Volver al inicio</Link>
          </p>
        </>
      )}
      {!error && !loading
        && (
        <div className="m-10 mx-8 flex flex-row flex-wrap lg:flex-nowrap content-between justify-center gap-x-12 gap-y-12">
          <div className="grow max-w-2xl lg:max-w-md">
            <section className="mt-8">
              <ProfileInfo user={user} />
            </section>
            <section>
              <h2 className="text-2xl mt-10 text-center lg:text-left">Logros</h2>
              <div className="flex flex-row flex-wrap gap-2 w-60 lg:w-80 mx-auto justify-center lg:justify-start lg:mx-0">
                {user?.achievements.map((achievementOnMember) => (
                  <Badge
                    key={achievementOnMember.achievement.id}
                    achievementOnMember={achievementOnMember}
                  />
                ))}
              </div>
            </section>
          </div>
          <section className="rounded-xl bg-slate-300 dark:bg-slate-800 shadow-md p-6 max-w-3xl">
            <UserBio userProfile={userProfile} />
          </section>
        </div>
        )}
    </>
  );
}
