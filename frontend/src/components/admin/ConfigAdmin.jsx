import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

export default function ConfigAdmin() {
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  async function triggerBackup(e) {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_BASE_API_URL}/backups/trigger`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage('Backup creado exitosamente.');
  }

  async function restoreBackup(e) {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_BASE_API_URL}/backups/restore`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage('Backup restaurado exitosamente.');
  }

  return (
    <div className="admin__main">
      {/* <!-- adminindexbox1--> */}
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <Link href="/admin/">Admin</Link>
        </li>
        <li className="adminindexbox-item active">Configuración</li>
      </ol>
      {/* <!-- adminBox--> */}
      <section className="prose dark:prose-invert">
        <h2>Backups</h2>
        {message && <p className="font-semibold">{message}</p>}
        <div className="flex gap-4 mx-4 flex-wrap">
          <button
            type="button"
            onClick={triggerBackup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Crear backup
          </button>
          <button
            type="button"
            onClick={restoreBackup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restaurar backup

          </button>
        </div>
      </section>
    </div>
  );
}
