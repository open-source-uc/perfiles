/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

function CardRequest({
  name, createdAt, state, description, id,
}) {
  const dateFormated = new Date(createdAt).toLocaleDateString('es-CL');

  // Configuramos el patch para cambiar el estado de la solicitud segun el boton presionado
  const [success, setSuccess] = React.useState(false);
  const handleApproveOrReject = (approved) => {
    axios.patch(`/api/requests/${id}`, {
      approved,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setSuccess(true);
  };
  return (
    <div className="block relative w-full p-1 overflow-hidden md:w-1/2 lg:w-1/4">
      { success ? (<div />) : (
        <article className="flex flex-col items-center justify-center rounded-lg shadow bg-white">
          <div className="flex flex-row items-center">
            <h5 className="text-gray-900 text-xl leading-tight m-2">{name}</h5>
            <span className=" text-gray-600 text-xs pl-3 pr-1">{dateFormated}</span>
          </div>
          <p className="text-gray-700 text-base mb-2 text-center">
            {description}
          </p>
          <div className="">
            <button type="button" onClick={() => handleApproveOrReject(true)} className="bg-gray-300 mb-1 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              ✅
            </button>
            <button type="button" onClick={() => handleApproveOrReject(false)} className="bg-gray-300 mb-1 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              ❌
            </button>
          </div>
        </article>
      )}
    </div>
  );
}

export default function ListaSolicitudes() {
  const [request, setRequest] = React.useState([]);

  useEffect(() => {
    axios.get('/api/requests/open', {
      // Accedemos a la API pasandole el token del admin
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setRequest(response.data);
      });
  }, []);

  return (
    <section className="admin-box admin-achievements">
      <div className="prose">
        <h2 className="admin-box__title dark:text-white">Solicitudes abiertas</h2>
      </div>
      <div className="container flex justify-center flex-wrap">
        {request?.map((solicitud) => (
          <CardRequest
            name={solicitud.memberUsername}
            createdAt={solicitud.achievement.createdAt}
            state={solicitud.achievement.name}
            description={solicitud.description}
            id={solicitud.id}
            key={solicitud.id}
          />
        ))}
      </div>
    </section>
  );
}
