import * as React from 'react';

export default function ConfigAdmin() {
  return (
    <div className="admin__main">
      {/* <!-- adminindexbox1--> */}
      <ol className="adminindexbox">
        <li className="adminindexbox-item">
          <a href="/admin/index.html">Admin</a>
        </li>
        <li className="adminindexbox-item active">Configuración</li>
      </ol>
      {/* <!-- adminBox--> */}
      <section className="admin-box admin-integrations">
        <h2>Integraciones</h2>
        <div className="admin-integrations-inputs">
          <div className="admin-integrations-inputs__input">
            <label htmlFor="gh_api_token" type="text">
              GitHub API Token
              <input type="text" id="gh_api_token" name="gh_api_token" value="" />
            </label>
          </div>
          <div className="admin-integrations-inputs__input">
            <label htmlFor="tg_api_token">
              Telegram API Token
              <input type="text" id="tg_api_token" name="tg_api_token" value="" />

            </label>
          </div>
          <div className="admin-integrations-inputs__input">
            <label htmlFor="fw_api_token">
              ForwardEmail API Token
              <input type="text" id="fw_api_token" name="fw_api_token" value="" />

            </label>
          </div>
          {/* <!-- Guardar button --> */}
          <div className="admin-integrations-inputs__input">
            <button className="admin-integrations-inputs__input__button" id="save-integrations" type="button">Guardar</button>
          </div>
        </div>
      </section>
      <section className="admin-box admin-criteria">
        <h2>Criterios de membresía y permanencia</h2>
        <div className="admin-criteria-inputs">
          {/* <!-- Two inputs: Puntaje de Membresía y Puntaje de Permanencia --> */}
          <div className="admin-criteria-inputs__input">
            <label htmlFor="membership_score">
              Puntaje de Membresía
              <input type="number" id="membership_score" name="membership_score" value="" />
            </label>
          </div>
          <div className="admin-criteria-inputs__input">
            <label htmlFor="staying_score">
              Puntaje de Permanencia
              <input type="number" id="staying_score" name="staying_score" value="" />
            </label>
          </div>
          {/* <!-- Guardar button --> */}
          <div className="admin-criteria-inputs__input admin-criteria-button">
            <button className="admin-criteria-inputs__input__button" id="save-criteria" type="button">Guardar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
