/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';

function FilaSolicitud(props) {
  const { name, createdAt, state } = props;
  const dateFormated = new Date(createdAt).toLocaleDateString('es-CL');
  return (
    <tr>
      <td>{name}</td>
      <td>{dateFormated}</td>
      <td>{state}</td>
    </tr>
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
      <h2 className="admin-box__title">Solicitudes abiertas</h2>
      <table className="admin-achievements__table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Nombre logro</th>
          </tr>
        </thead>
        <tbody>
          {request?.map((solicitud) => (
            <FilaSolicitud
              name={solicitud.memberUsername}
              createdAt={solicitud.achievement.createdAt}
              state={solicitud.achievement.name}
              key={solicitud.id}
            />
          ))}

        </tbody>
      </table>
    </section>
  );
}
