/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

export default function Solicitudes() {
  const [description, setDescripcion] = React.useState('');
  return (
    <section className="personal-profile">
      <div className="profile-header">
        <div className="profile-info">
          <h1>Solicitudes</h1>
        </div>
      </div>
      <form className="form-solicitud">
        <p>
          <input
            className="input-solicitud"
            value={description}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            type="text"
            name="descripción"
            required
          />
        </p>
        <button type="submit" className="button-solicitud">Submit</button>
      </form>
    </section>
  );
}
