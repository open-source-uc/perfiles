import * as React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      <h1>No se ha encontrado la ruta solicitada</h1>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}

export default NoMatch;
