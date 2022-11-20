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
    axios.get('/api/public/members/')
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

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    USUARIO
                  </th>
                  <th scope="col" className="py-3 px-6">
                    RK
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
                    <th scope="row" className="overflow-hidden relative flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="absolute rounded-full shadow-2xl -left-12" src={`https://avatars.githubusercontent.com/${member.username}?s=160`} alt={member.username} />
                      <div className="pl-20 py-5">
                        <div className="text-base font-semibold ml-[68px]">{member.profile.name}</div>
                        <div className="font-normal text-gray-500 ml-[68px]">{member.role}</div>
                      </div>
                    </th>
                    <td className="py-4 px-6 font-black">
                      {memberIndex + 1}
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
      )}
    </>
  );
}
