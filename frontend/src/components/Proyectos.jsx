/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useContext, useState, Fragment,
} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Tab, Dialog, Transition } from '@headlessui/react';
import handleError from '../utils/error-handler';
import { CreateModal, FormProyectos, FormIdeas } from './common/CreateModal';
import ProjectCards from './common/ProjectCards';

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
  const [isOpen1, setIsOpen1] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  React.useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/public/projects`)
      .then((res) => setProyectos(res.data))
      .catch((err) => {
        const errorMsg = handleError(err);
        setError(errorMsg);
      });
  }, []);
  return (
    <section className="mt-24 p-4">
      <Helmet>
        <title>Proyectos | Members OSUC</title>
      </Helmet>
      {/* <h1 className="text-center text-4xl p-2 m-0 bg-gray-800/60">Proyectos e ideas</h1> */}
      <h1 className="text-center text-4xl p-2 mt-4 font-semibold">Proyectos e ideas 🚀</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 p-1 mx-auto w-[90%] md:[70%] lg:w-[50%] xl:w-[30%] bg-osuc-black-2 rounded-xl">
          <Tab
            className="w-full rounded-lg py-2.5 font-medium  leading-5 text-md text-gray-100  ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Proyectos</span>
          </Tab>
          <Tab
            className="w-full rounded-lg py-2.5 font-medium  leading-5 text-md text-gray-100  ui-selected:bg-osuc-navyblue"
          >
            <span className="text-center">Ideas</span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProjectCards elementList={proyectos} key={proyectos} />
            <CreateModal isOpen={isOpen1} setIsOpen={setIsOpen1} title="Crear un proyecto" formulario={<FormProyectos isOpen={isOpen1} setIsOpen={setIsOpen1} />} />
            <BtnCreate onClick={() => setIsOpen1(true)} />
          </Tab.Panel>
          <Tab.Panel>
            <p>¡Nada aquí todavía!</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
