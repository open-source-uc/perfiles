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
import { CreateModal, InfoBadge } from './common/CreateModal';

export default function Logros() {
  const user = React.useContext(UserContext);
  const [achievements, setAchievements] = useState([]);
  const [achievementProgression, setAchievementProgression] = useState({});
  const [myAchievements, setMyAchievements] = useState(new Set());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/public/achievements/progression`).then((res) => setAchievementProgression(res.data)).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
    });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/public/achievements`).then((res) => setAchievements(res.data)).catch((err) => {
      const errorMsg = handleError(err);
      setError(errorMsg);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_BASE_API_URL}/members/me`, {
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
    <section className="mt-24">
      <Helmet>
        <title>Logros | Members OSUC</title>
      </Helmet>
      <h1 className="text-center text-4xl p-2 mt-4 font-semibold">Logros</h1>
      {loading && !error && <LoadingAnimation />}
      {error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      {!error && !loading && (
      <Tab.Group>
        <Tab.List className="flex space-x-1 p-1 mx-auto w-[90%] md-[70%] lg:w-[50%] xl:w-[30%] bg-osuc-black-2 rounded-xl">
          <Tab
            className="w-full rounded-lg py-2.5 font-medium  leading-5 text-md text-gray-100  ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Sourcerer</span>
          </Tab>
          <Tab
            className="w-full rounded-lg py-2.5 font-medium  leading-5 text-gray-100 text-md ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Misceláneo</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} title="Informacion del logro" formulario={<InfoBadge isOpen={isOpen} setIsOpen={setIsOpen} />} />
            <SkillTree
              achievementProgression={achievementProgression}
              myAchievements={myAchievements}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
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
