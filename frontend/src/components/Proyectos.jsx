/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useContext, useState, Fragment,
} from 'react';
import { Helmet } from 'react-helmet';
import { Tab, Dialog, Transition } from '@headlessui/react';
import { CreateModal, FormProyectos, FormIdeas } from './common/CreateModal';
import CardsProyects from './common/CardsProyects';

// TODO: BORRAR luego de mergear a develop e importar la misma funcion desde utils
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BtnCreate({ onClick }) {
  return (
    <button type="button" onClick={onClick} title="Agregar" className="fixed bottom-10 right-24 z-50 text-white px-4 w-auto h-10 bg-blue-700 rounded-full hover:bg-blue-800 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
      <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
        <path
          fill="#FFFFFF"
          d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
        />
      </svg>
      <span>Agregar</span>

    </button>
  );
}

export default function Proyectos() {
  const categories = ['Proyectos', 'Ideas'];
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const listElements = [
    {
      title: 'Proyecto 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      hashtags: ['UwU', 'owo', 'uwuuwuwuwuwu'],
      size: 5,
    },
    {
      title: 'Proyecto 2',
      description: 'ñeñeñeñe',
    },
    {
      title: 'Proye',
      description: 'ñeñeñeñe',
      hashtags: [],
      size: 2,
    },
  ];
  return (
    <section>
      {/* <h1 className="text-center text-4xl p-2 m-0 bg-gray-800/60">Proyectos e ideas</h1> */}
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-gray-800/60 p-1 mx-auto">
          {categories.map((category) => (
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
          <Tab.Panel>
            <CardsProyects listElements={listElements} />
            <CreateModal isOpen={isOpen1} setIsOpen={setIsOpen1} title="Crear una idea para OSUC" formulario={<FormProyectos isOpen={isOpen1} setIsOpen={setIsOpen1} />} />
            <BtnCreate onClick={() => setIsOpen1(true)} />
          </Tab.Panel>
          <Tab.Panel>
            <CardsProyects listElements={listElements} />
            <CreateModal isOpen={isOpen2} setIsOpen={setIsOpen2} title="UwU" formulario={<FormIdeas isOpen={isOpen2} setIsOpen={setIsOpen2} />} />
            <BtnCreate onClick={() => setIsOpen2(true)} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
