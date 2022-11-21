import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import handleError from '../utils/error-handler';
import LoadingAnimation from './common/LoadingAnimation';

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
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/public/members/`)
      .then((response) => {
        setMembers(response.data.slice(0, 100).sort((a, b) => b.stats.points - a.stats.points));
        setLoading(false);
      }).catch((err) => {
        const errorMsg = handleError(err);
        setError(errorMsg);
        setLoading(false);
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
      { loading && (
      <LoadingAnimation />
      ) }
      { error && <h2 className="text-center text-2xl font-bold">{error}</h2> }
      { !loading && !error && (
      <div>
        <section id="leaderboard" className="pb-4 w-10/12 mx-auto">
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button className="w-48 inline-flex items-center mt-4 text-gray-500 bg-white rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white">
              {selectedPerson.name}
              <svg className="ml-2 w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </Listbox.Button>
            <Listbox.Options className="w-48 dark:bg-gray-700 z-50 absolute max-h-60 overflow-auto rounded-md text-base shadow-lg border sm:text-sm">
              {people.map((person) => (
                <Listbox.Option key={person.id} value={person} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`relative cursor-default select-none px-2 rounded divide-y divide-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:divide-gray-600 ${
                        active ? 'bg-blue-500' : 'bg-white'
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
          <table className="my-3 w-full shadow-md rounded-lg text-xs md:text-md text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-3">
                  USUARIO
                </th>
                <th scope="col" className="py-3 px-3">
                  RK
                </th>
                <th scope="col" className="py-3 px-3">
                  Puntos
                </th>
                <th scope="col" className="py-3 px-3">
                  Nivel
                </th>
              </tr>
            </thead>
            <tbody>
              {!error && members.map((member, memberIndex) => (
                <tr onClick={() => { redirectProfile(member.username); }} className="gap-0 whitespace-nowrap bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="mr-0 pr-0  overflow-hidden relative md:flex items-center py-1 px-0 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="absolute rounded-full shadow-2xl -left-12 hidden md:block" src={`https://avatars.githubusercontent.com/${member.username}?s=160`} alt={member.username} />
                    <div className="pl-3 py-5 md:px-36">
                      <div className="font-semibold">{member.profile.name}</div>
                      <div className="font-normal text-gray-500">{member.role}</div>
                    </div>
                  </th>
                  <td className="py-4 px-3 font-black">
                    {memberIndex + 1}
                  </td>
                  <td className="py-4 px-3">
                    {member.stats.points}
                  </td>
                  <td className="py-4 px-3">
                    {member.stats.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>
      </div>
      )}
    </>
  );
}
