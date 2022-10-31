/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Badge from './common/Badge';
import SkillTree from './common/SkillTree';
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
    <section className="personal-profile">
      <p className="admin__welcome">Logros</p>
      <article className="badge-article">
        <div className="skill-tree">
          <SkillTree />
          <SkillTree />
        </div>
      </article>
    </section>
  );
}
