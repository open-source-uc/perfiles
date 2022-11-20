import * as React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import LoadingAnimation from './common/LoadingAnimation';
import ProfileCard from './common/ProfileCard';
import handleError from '../utils/error-handler';

import { getAuthHeader } from '../utils/auth';

export default function Leaderboard() {
  const navigate = useNavigate();
  const redirectProfile = (username) => {
    navigate(`/perfil/${username}`);
  };
  const people = [
    { id: 1, name: 'Todos los tiempos', unavailable: false },
    { id: 3, name: 'Semana', unavailable: false },
    { id: 4, name: 'Mes', unavailable: true },
    { id: 5, name: 'Año', unavailable: false },
  ];
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [members, setMembers] = useState([]);
  React.useEffect(() => {
    axios.get('/api/public/members/')
      .then((response) => {
        setMembers(response.data.slice(0, 100).sort((a, b) => b.stats.points - a.stats.points));
      });
  }, []);

  return (
    <>
      <section id="welcome-hero">
        <div className="prose dark:prose-invert mx-auto my-8">
          <h1 className="">Ranking de integrantes 🏆</h1>
          <p className="">
            Aquí podrás encontrar el ranking de integrantes de OSUC, ordenados
            por puntaje.
          </p>
        </div>
      </section>
      <div className="flex justify-center">
        <section id="leaderboard" className="flex-col justify-items-center">
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button>{selectedPerson.name}</Listbox.Button>
            <Listbox.Options>
              {people.map((person) => (
                <Listbox.Option key={person.id} value={person} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                      }`}
                    >
                      {selected && <CheckIcon />}
                      {person.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          {/* <table className="table-auto">
            <thead>
              <tr>
                <th>RK</th>
                <th>Usuario</th>
                <th>Puntos</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody className="table rounded-md bg-osuc-white-3">
              {!error && members.map((member, memberIndex) => (
                <tr>
                  <td>{memberIndex + 1}</td>
                  <td>{member.profile.name}</td>
                  <td>{member.stats.points}</td>
                  <td>{member.stats.level}</td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    RK
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Usuario
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Puntos
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Nivel
                  </th>
                </tr>
              </thead>
              <tbody>
                {!error && members.map((member, memberIndex) => (
                  <tr onClick={() => { redirectProfile(member.username); }} className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="rounded-full" src={`https://avatars.githubusercontent.com/${member.username}?s=120`} alt={member.username} />

                      <div className="pl-3">
                        <div className="text-base font-semibold">{member.profile.name}</div>
                        <div className="font-normal text-gray-500">{member.profile.email}</div>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      {member.stats.points}
                    </td>
                    <td className="py-4 px-6">
                      {member.stats.points}
                    </td>
                    <td className="py-4 px-6">
                      {member.stats.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </div>
    </>
  );
}
