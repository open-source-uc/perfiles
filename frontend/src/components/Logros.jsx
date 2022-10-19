/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Badge from './common/Badge';
import UserContext from '../contexts/userContext';

export default function Logros() {
  const [achievements, setAchievements] = React.useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('/api/public/achievements')
      .then((response) => {
        setAchievements(response.data);
      });
  }, []);

  const userObtainedAchievements = user?.achievements?.map(
    (achievement) => achievement.achievement.id,
  );

  return (
    // <div className="no-min-height">
    //   <p className="admin__welcome">Logros</p>
    //   <div className="logros-container">
    //       <div id="logros-canvas">
    //       </div>
    //   </div>
    // </div>
    <section className="personal-profile">
      <p className="admin__welcome">Logros</p>
      <article className="badge-article">
        {achievements?.map((logro) => (
          <Badge
            id={logro.id}
            key={logro.id}
            name={logro.name}
            description={logro.description}
            imageURL={logro.imageURL}
            level={logro.level}
            isHighlighted={!!userObtainedAchievements?.includes(logro.id)}
          />
        ))}
      </article>
    </section>
  );
}
