import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import RelativeTime from '@yaireo/relative-time';
import UserContext from '../../contexts/userContext';
import LoadingAnimation from '../common/LoadingAnimation';
import handleError from '../../utils/error-handler';

export default function IndexAdmin() {
  const user = React.useContext(UserContext);
  const [recentAuditMessages, setRecentAuditMessages] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/audit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setRecentAuditMessages(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(handleError(e));
      });
  }, []);

  if (error) {
    return (
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold">🚨 Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  const rtf = new RelativeTime({ locale: 'es' });

  return (
    <div className="admin__main mx-4">
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <Link to="/admin/">Admin</Link>
        </li>
      </ol>
      <p className="text-center text-4xl pt-4">
        Bienvenido/a,
        {' '}
        {user?.profile?.name}
        {' '}
        👋
      </p>
      <h2 className="text-lg">Actividad reciente</h2>
      {recentAuditMessages.length === 0 && (
        <p className="font-semibold">No hay actividad reciente para mostrar.</p>
      )}
      <ul className="mb-8 shadow-md">
        {recentAuditMessages.slice(0, 7).map((auditMessage) => (
          <div key={auditMessage.id} className="even:bg-osuc-black-4 even:text-osuc-white-3 odd:bg-osuc-white-4 odd:text-osuc-black-1">
            <div className="p-4 text-lg">
              {auditMessage.message}
              <time dateTime={auditMessage.createdAt} className="text-right block text-sm">
                {rtf.from(new Date(auditMessage.createdAt))}
              </time>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
