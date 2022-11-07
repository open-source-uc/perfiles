/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import Badge from './common/Badge';
import SkillTree from './common/SkillTree';
import UserContext from '../contexts/userContext';

export default function Logros() {
  const [achievements, setAchievements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('/api/public/achievements')
      .then((response) => {
        setAchievements(response.data);
        setLoading(false);
      }).catch((err) => {
        if (err.response) {
          setError(`El servidor respondió con un error (${err.response.status}).`);
        } else if (err.request) {
          setError('No se pudo conectar con el servidor.');
        } else {
          setError('Ocurrió un error desconocido al cargar los logros.');
        }
        setLoading(false);
      });
  }, []);

  const userObtainedAchievements = user?.achievements?.map(
    (achievement) => achievement.achievement.id,
  );

  return (
    <section>
      <h1 className="text-center text-4xl pt-4">Logros</h1>
      <SkillTree />
    </section>
  );
}
