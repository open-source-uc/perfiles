/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import Badge from '../common/Badge';
import BadgeModal from './components/BadgeModal';
import ListaSolicitudes from './ListaSolicitudes';
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
      <section className="admin-box admin-statistics prose dark:prose-invert">
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
      <ListaSolicitudes />

      <section className="admin-box admin-center">
        <BadgeModal />
      </section>

      <section className="admin-box admin-link prose dark:prose-invert">
        <h2 className="admin-box__title">Crear nuevo enlace</h2>
        <div className="admin-link__grid">
          <input type="text" placeholder="Buscar logro" />
          <button className="button-admin admin-link__search-button" type="button">
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
            <button className="button-admin admin-link__generate-button" type="button">Generar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
