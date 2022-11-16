/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// eslint-disable-next-line object-curly-newline
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UserContext from '../contexts/userContext';
import { RequireAuth } from '../utils/auth';
import handleError from '../utils/error-handler';

function humanReadableStatus(status) {
  if (status === 'OPEN') {
    return 'Pendiente';
  }
  if (status === 'APPROVED') {
    return 'Aprobada';
  }
  if (status === 'REJECTED') {
    return 'Rechazada';
  }
  return 'Desconocido';
}

function FilaSolicitud({ name, createdAt, state }) {
  const dateFormated = new Date(createdAt).toLocaleDateString('es-CL');
  return (
    <tr className="border-b">
      <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">{name}</td>
      <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">{dateFormated}</td>
      <td className="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap">{humanReadableStatus(state)}</td>
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
    if (!values.achievementId) { errors.achievementId = 'Requerido'; }
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
      <section className="personal-profile h-screen flex items-center">
        <div className="profile-header">
          <div className="profile-info prose dark:prose-invert">
            <h2>Nueva solicitud</h2>
          </div>
        </div>
        { success && (
        <div className="alert alert-success">
          Solicitud enviada correctamente
        </div>
        )}
        { alreadyCreated && (
          <div className="alert alert-warning">
            Ya tienes una solicitud pendiente
          </div>
        )}
        { errorMsg && (
          <div className="alert alert-danger">
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
            {(props) => (
              <Form onSubmit={handleSubmit} className="form-solicitud flex justify-center mt-6">
                {/* Listbox para seleccionar achivement */}
                <h3>Selecciona un logro</h3>
                <Field
                  as="select"
                  name="achievementId"
                  id="achievement-select"
                  className="input-solicitud text-gray dark:text-gray-900"
                  required
                >
                  {achievementsUserDoesNotHave.map((a) => (
                    <option value={a.id} key={a.id}>{a.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="achievementId" />
                <Field
                  id="description"
                  className="input-solicitud px-12 w-full border rounded py-2 text-gray-700 items-center"
                  placeholder="Razón o evidencia para la solicitud"
                  type="text"
                  name="description"
                  required
                />
                <ErrorMessage name="description" />

                <button type="submit" className="button-solicitud text-white dark:text-gray-900">Enviar solicitud</button>
              </Form>
            )}
          </Formik>
        ) : (
          <h2 className="prose dark:prose-invert">Al parecer ya tienes todos los logros solicitables! 🤝</h2>
        )}
        <div className="profile-header mt-10">
          <div className="profile-info prose dark:prose-invert">
            <h2>Solicitudes enviadas</h2>
          </div>
        </div>
        <section className="admin-achievements">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left">Logro solicitado</th>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left">Fecha de creación</th>
                <th className="text-sm font-medium text-gray-900 dark:text-white px-6 py-4 text-left">Estado</th>
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
