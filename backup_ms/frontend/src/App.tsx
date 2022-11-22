import './App.css';

import { Link, Route } from 'wouter';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Backup = {
  id: string;
  createdAt: string;
  blob?: object;
}

function Backup({ id }: { id: string }) {
  const [backup, setBackup] = useState<Backup>();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/backups/${id}`).then((response) => {
      setBackup(response.data);
    });
  }, [id]);

  const df = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'long',
    timeStyle: 'long',
  });

  return (
    <>
      {backup && (
      <>
        <h2 className="mb-2">
          Backup
          {' '}
          <code>{id}</code>
        </h2>
        <span className="font-mono">
          Obtenida el
          {' '}
          <time dateTime={backup?.createdAt}>{df.format(new Date(backup?.createdAt))}</time>
        </span>
        <pre className="text-left">
          {JSON.stringify(backup?.blob, null, 2)}
        </pre>
      </>
      )}
      {!backup && <p>Cargando...</p>}
    </>
  );
}

function App() {
  const [backups, setBackups] = useState<Backup[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_API_URL}/backups`)
      .then((res) => {
        setBackups(res.data);
      });
  }, []);

  const df = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'long',
    timeStyle: 'long',
  });

  return (
    <main className="prose">
      <h1 className="text-center">Servicio de Backups</h1>
      <section>
        <h2>Backups disponibles</h2>
        <ol>
          {backups.map((backup: Backup) => (
            <li key={backup.id}>
              <Link href={`/backups/${backup.id}`}><time dateTime={backup.createdAt} className="underline">{df.format(new Date(backup.createdAt))}</time></Link>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <Route path="/backups/:id">{(params) => <Backup id={params.id} />}</Route>
      </section>
    </main>
  );
}

export default App;
