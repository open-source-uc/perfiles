/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import UserContext from '../contexts/userContext';
import SkillTree from './common/SkillTree';
import handleError from '../utils/error-handler';
import LoadingAnimation from './common/LoadingAnimation';
import SkillGrid from './common/SkillGrid';

export default function Logros() {
  const user = React.useContext(UserContext);
  const [achievements, setAchievements] = useState([]);
  const [achievementProgression, setAchievementProgression] = useState({});
  const [myAchievements, setMyAchievements] = useState(new Set());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    axios.get('/api/public/achievements/progression').then((res) => setAchievementProgression(res.data)).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/public/achievements').then((res) => setAchievements(res.data)).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get('/api/members/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(
        (res) => {
          setMyAchievements(new Set(res.data.achievements.map((a) => a.achievement.id)));
        },
      ).then(
        () => setLoading(false),
      ).catch(
        (err) => {
          const errorMsg = handleError(err);
          setError(errorMsg);
          setLoading(false);
        },
      );
    }
  }, [user]);
  return (
    <section>
      <Helmet>
        <title>Logros | Members OSUC</title>
      </Helmet>
      <h1 className="text-center text-4xl p-2 mt-4">Logros</h1>
      {loading && !error && <LoadingAnimation />}
      {error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      {!error && !loading && (
      <Tab.Group>
        <Tab.List className="flex space-x-1 p-1 mx-auto w-[90%] md-[70%] lg:w-[50%] xl:w-[30%] bg-osuc-black-2 rounded-xl">
          <Tab
            className="w-full rounded-lg py-2.5 font-medium text-xxs leading-5 text-lg text-gray-100  ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Sourcerer</span>
          </Tab>
          <Tab
            className="w-full rounded-lg py-2.5 font-medium text-xxs leading-5 text-gray-100 text-lg ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Misceláneo</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <SkillTree
              achievementProgression={achievementProgression}
              myAchievements={myAchievements}
            />
          </Tab.Panel>
          <Tab.Panel>
            <SkillGrid achievements={achievements} myAchievements={myAchievements} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      )}
    </section>
  );
}
