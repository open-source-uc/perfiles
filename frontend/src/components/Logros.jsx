/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tab } from '@headlessui/react';
import { classNames } from '../utils/auth';

import SkillTree from './common/SkillTree';

export default function Logros() {
  const [categories] = useState({
    Developer: { description: 'Contribuye a los repositorios de OSUC, genera proyectos, cantidad de PR, issues y/o líneas de código agregadas a repos de la org. o de miembros de la org.' },
    'Event-goer': { description: 'Participar en CTF, hackatones como participante, no como organizador' },
    Outgoing: { description: 'Participó en eventos sociales de comunidad no relacionados necesariamente con programación o donde la programación no es el enfoque principal del evento' },
    Volunteer: { description: 'Ayuda en eventos o talleres dentro de la organización, ayuda a organizar, a ordenar, a realizar algún evento de la org' },
    Miscellaneous: { description: 'Otro tipo de recompensas que no entran en las categorias anteriores' },
  });

  return (
    <section>
      <Helmet>
        <title>Logros | Members OSUC</title>
      </Helmet>
      <h1 className="text-center text-4xl p-2 m-0 bg-gray-800/60">Logros</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-gray-800/60 p-1 mx-auto">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) => classNames(
                'w-full rounded-lg py-2.5 font-medium text-xxs leading-5 text-gray-800 sm:text-sm lg:text-sm xl:text-lg',
                selected
                  ? 'bg-white'
                  : 'text-gray-100 hover:bg-white/[0.12] hover:text-white',
              )}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel>
              <div className="mt-2 p-5 leading-normal text-gray-600 bg-gray-200 rounded-lg w-full md:w-2/3 mx-auto">
                <p>{category.description}</p>
              </div>
              <SkillTree />
            </Tab.Panel>
          ))}

        </Tab.Panels>
      </Tab.Group>

    </section>
  );
}
