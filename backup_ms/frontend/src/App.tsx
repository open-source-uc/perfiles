import './App.css'

import { Link, Route } from 'wouter'

import React, {useEffect} from 'react'

function Backup({ id }: { id: string }) {
  return (
    <>
      <h2>Backup {id}</h2>
    </>
  )
}

function App() {

  return (
    <main className='prose'>
      <h1 className='text-center'>Servicio de Backups</h1>
      <section>
        <h2>Backups disponibles</h2>
        <ol>
          <li>
            <Link href="/backups/1">
              <a className="link">Backup 1</a>
            </Link>
          </li>
        </ol>
      </section>

      <section>
        <Route path="/backups/:id">{(params) => <Backup id={params.id} />}</Route>
      </section>
    </main>
  )
}

export default App
