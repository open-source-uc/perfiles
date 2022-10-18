/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';

export default function LogrosAdmin() {
  return (
    <div className="admin__main">
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <a href="/admin/index">Admin</a>
        </li>
        <li className="adminindexbox-item active">Logros y contadores</li>
      </ol>
      <section className="admin-box admin-statistics">
        <h2 className="admin-box__title">Estadísticas</h2>
        <div className="admin-statistics__stats">
          <div className="admin-statistics__stat">
            <h3 className="admin-statistics__stat-title">Logros obtenidos</h3>
            <p className="admin-statistics__stat-value">0</p>
          </div>
          <div className="admin-statistics__stat">
            <h3 className="admin-statistics__stat-title">Puntos Generados</h3>
            <p className="admin-statistics__stat-value">0</p>
          </div>
          <div className="admin-statistics__stat">
            <h3 className="admin-statistics__stat-title">Usuarios Activos</h3>
            <p className="admin-statistics__stat-value">0</p>
          </div>
          <div className="admin-statistics__stat">
            <h3 className="admin-statistics__stat-title">Asistencia Reciente a Eventos</h3>
            <p className="admin-statistics__stat-value">0</p>
          </div>
          <div className="admin-statistics__stat">
            <h3 className="admin-statistics__stat-title">Logros Disponibles</h3>
            <p className="admin-statistics__stat-value">0</p>
          </div>
        </div>
      </section>
      <section className="admin-box admin-achievements">
        <h2 className="admin-box__title">Solicitudes de logros</h2>
        <table className="admin-achievements__table">
          <thead>
            <tr>
              <th>Logro</th>
              <th>Nombre</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Esquema Piramidal</td>
              <td>Fernando Smith</td>
              <td>Pendiente</td>
            </tr>
            <tr>
              <td>cruz@uc.cl</td>
              <td>Alister McCormack</td>
              <td>Pendiente</td>
            </tr>
            <tr>
              <td>Mente de tiburón</td>
              <td>José Antonio Castro</td>
              <td>Pendiente</td>
            </tr>
            <tr>
              <td>Hello world</td>
              <td>Hernán Valdivieso</td>
              <td>Rechazada</td>
            </tr>
            <tr>
              <td>Tenemos que Hablar</td>
              <td>Victor Hernández</td>
              <td>Aprobada</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="admin-box admin-center">
        <button type="button" className="round__button">Crear un Logro</button>
        {/* A modal that enables file upload */}

      </section>

      <section className="admin-box admin-link">
        <h2 className="admin-box__title">Crear nuevo enlace</h2>
        <div className="admin-link__grid">
          <input type="text" placeholder="Buscar logro" />
          <button className="admin-link__search-button" type="button">
            <i className="fa-solid fa-search" />
          </button>
          <div className="admin-link__select">
            <select name="expiration" id="expiration">
              <option value="1">1 día</option>
              <option value="2">2 días</option>
              <option value="3">3 días</option>
              <option value="4">4 días</option>
              <option value="5">5 días</option>
              <option value="6">6 días</option>
              <option value="7">7 días</option>
            </select>
          </div>
          <div className="admin-link__generate">
            <button className="admin-link__generate-button" type="button">Generar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
