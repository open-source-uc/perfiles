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
    <div>
      { success ? (<div />) : (
        <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-white p-6 w-s max-w-s flex-1 grow-0">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{name}</h5>
          <span className="text-gray-900 ">{dateFormated}</span>
          {'  '}
          <span className="text-gray-900 ">{state}</span>
          <p className="text-gray-700 text-base mb-4 text-ellipsis max-w-[100px]">
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
        </div>
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
      <div className="flex justify-center gap-8 my-8">
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
