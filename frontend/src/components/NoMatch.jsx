import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as RobotDCC } from '../assets/images/robot-dcc.svg';

function NoMatch() {
  return (
    <div className="flex flex-col h-screen text-gray-700 items-center justify-center w-full min-h-full bg-gray-100 p-8 md:flex-row">
      <RobotDCC className="h-auto object-scale-down overflow-hidden w-3/4 md:w-4/12" alt="404" />
      <div className="max-w-md px-2 text-sm md:text-base lg:px-0">
        <header className="mb-6">
          <h1 className="text-4xl font-bold leading-none text-gray-400 select-none md:text-6xl">404.</h1>
          <h2 className="text-xl font-light leading-normal lg:text-3xl md:text-3xl">Lo sentimos, no pudimos encontrar esta página.</h2>
        </header>

        <p className="max-w-sm mb-5 leading-5 md:leading-7">
          No te preocupes, cualquiera se equivoca.
          Puedes volver y encontrar muchas otras cosas en nuestra página.
        </p>
        <Link to="/">
          <button
            type="button"
            className="inline px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700"
          >
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NoMatch;
