/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ClockIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import UserContext from '../contexts/userContext';
import { RequireAuth } from '../utils/auth';
import handleError from '../utils/error-handler';

function humanReadableStatus(status) {
  if (status === 'OPEN') {
    return <ClockIcon className="w-6 text-yellow-600" />;
  }
  if (status === 'APPROVED') {
    return <CheckIcon className="w-6 text-green-600" />;
  }
  if (status === 'REJECTED') {
    return <XMarkIcon className="w-6 text-red-600" />;
  }
  return 'Desconocido';
}

function FilaSolicitud({ name, createdAt, state }) {
  const dateFormated = new Date(createdAt).toLocaleDateString('es-CL');
  return (
    <tr className="border-b">
      <td className="text-sm text-gray-900 dark:text-white font-light px-3 py-4 whitespace-nowrap">{name}</td>
      <td className="text-sm text-gray-900 dark:text-white font-light px-3 py-4 whitespace-nowrap">{dateFormated}</td>
      <td className="text-sm text-gray-900 dark:text-white font-light px-3 py-4 whitespace-nowrap">{humanReadableStatus(state)}</td>
    </tr>
  );
}

export default function Solicitudes() {
  // List of available achievements
  const [achievements, setAchievements] = React.useState([]);
  const [myAchievements, setMyAchievements] = React.useState([]);

  const [success, setSuccess] = React.useState(false);
  const [alreadyCreated, setAlreadyCreated] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);

  const user = React.useContext(UserContext);
  const myRequests = user?.created_requests;

  useEffect(() => {
    axios.get('/api/achievements', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setAchievements(response.data.filter((a) => a.type === 'BY_REQUEST'));
      });
  }, []);

  useEffect(() => {
    axios.get('/api/members/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setMyAchievements(response.data.achievements.map((a) => a.achievement));
      });
  }, [user]);

  const achievementsUserDoesNotHave = achievements.filter(
    (a) => !myAchievements.map(
      (ac) => (ac.id),
    ).includes(a.id),
  );

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    axios.put('/api/requests', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        setAlreadyCreated(true);
      } else {
        setSuccess(true);
      }
    }).catch((error) => {
      setSuccess(false);
      setErrorMsg(handleError(error));
    });
  };

  const validar = (values) => {
    const errors = {};
    if (!values.description) {
      errors.description = 'Requerido';
    } else if (values.description.length < 10) {
      errors.description = 'Debe tener al menos 10 caracteres';
    }
    return errors;
  };

  return (
    <RequireAuth>
      <Helmet>
        <title>Solicitar un logro | Members OSUC</title>
      </Helmet>
      <section className="personal-profile mx-auto h-full flex items-center">
        <div className="profile-header">
          <div className="profile-info prose dark:prose-invert">
            <h2>Nueva solicitud</h2>
          </div>
        </div>
        {/* // TODO: Mejorar esto para que se elimine el mensaje anterior */}
        { success && (
        <div className="alert alert-success text-green-600">
          Solicitud enviada correctamente
        </div>
        )}
        { alreadyCreated && (
          <div className="alert alert-warning text-red-600">
            Ya tienes una solicitud pendiente
          </div>
        )}
        { errorMsg && (
          <div className="alert alert-danger text-red-600">
            {errorMsg}
          </div>
        )}
        {achievementsUserDoesNotHave.length > 0 ? (
          <Formik
            initialValues={{
              achievementId: '',
              description: '',
            }}
            validate={validar}
          >
            <Form onSubmit={handleSubmit} className="flex flex-column flex-wrap align-center justify-center mt-6">
              {/* Listbox para seleccionar achivement */}
              <h3>Selecciona un logro</h3>
              <Field
                as="select"
                name="achievementId"
                id="achievement-select"
                className="m-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {achievementsUserDoesNotHave.map((a) => (
                  <option value={a.id} key={a.id}>{a.name}</option>
                ))}
              </Field>
              <div className="text-red-600"><ErrorMessage name="achievementId" /></div>
              <Field
                id="description"
                className="m-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Razón o evidencia para la solicitud"
                type="text"
                name="description"
                required
              />
              <div className="text-red-600"><ErrorMessage name="description" /></div>

              <button type="submit" className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-gray-900">Enviar solicitud</button>
            </Form>
          </Formik>
        ) : (
          <h2 className="prose dark:prose-invert">Al parecer ya tienes todos los logros solicitables! 🤝</h2>
        )}
        <div className="profile-header mt-10">
          <div className="profile-info prose dark:prose-invert">
            <h2>Solicitudes enviadas</h2>
          </div>
        </div>
        <section>
          <table className="my-3 w-full text-xs md:text-md text-left text-gray-500 dark:text-gray-400">
            <thead className="border-b">
              <tr>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-3 py-4 text-left">Logro solicitado</th>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-3 py-4 text-left">Fecha de creación</th>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-3 py-4 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {myRequests?.map((solicitud) => (
                <FilaSolicitud
                  name={solicitud.achievement.name}
                  createdAt={solicitud.achievement.createdAt}
                  state={solicitud.state}
                  key={solicitud.id}
                />
              ))}

            </tbody>
          </table>
        </section>
      </section>
    </RequireAuth>
  );
}
