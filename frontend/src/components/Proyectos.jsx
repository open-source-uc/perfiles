/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tab } from '@headlessui/react';

// TODO: BORRAR luego de mergear a develop e importar la funcion desde utils
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Cards({ listElements }) {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="flex flex-wrap justify-center">
        {/* recorremos la lista de elementos */}
        {listElements.map((element) => (
          <article className="block m-1 relative p-3 rounded-lg shadow-2xl w-full overflow-hidden bg-gray-500 md:w-1/2 lg:w-1/4">
            <h3 className="title-font text-lg my-2 tracking-widest text-blue-800">{element.title.toUpperCase()}</h3>
            <p>{element.description}</p>
            {/* hashtag */}
            {(element.hashtags) && (
            <div className="pt-4">
              {element.hashtags.map((hashtag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                  #
                  {hashtag}
                </span>
              ))}
            </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Proyectos() {
  const categories = ['Proyectos', 'Ideas'];
  const listElements = [
    {
      title: 'Proyecto 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      hashtags: ['UwU', 'owo', 'uwuuwuwuwuwu'],
    },
    {
      title: 'Proyecto 2',
      description: 'ñeñeñeñe',
    },
    {
      title: 'Proyecto 3',
      description: 'ñeñeñeñe',
      hashtags: [],
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
          <Tab.Panel><Cards listElements={listElements} /></Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
