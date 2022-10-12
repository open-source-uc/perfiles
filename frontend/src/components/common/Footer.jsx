import * as React from 'react';
// import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      {/* Código autogenerado por https://chooser-beta.creativecommons.org/ */}
      <p>
        <a
          // eslint-disable-next-line react/no-unknown-property
          property="dct:title"
          href="https://perfiles.osuc.dev/"
        >
          Perfiles OSUC

        </a
        >
        de
        <a
        // eslint-disable-next-line react/no-unknown-property
          property="cc:attributionName"
          href="https://osuc.dev/"
        >
          Open Source UC

        </a
        >
        está licenciado bajo
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          CC BY-NC-SA 4.0
          <img
            style={{ 'margin-left': '3px', 'vertical-align': 'text-bottom' }}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            height="22px"
            alt="CC"
            title="Creative Commons"
          />
          <img
            style={{ 'margin-left': '3px', 'vertical-align': 'text-bottom' }}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            height="22px"
            alt="Persona"
            title="Atribución"
          />
          <img
            style={{ 'margin-left': '3px', 'vertical-align': 'text-bottom' }}
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
            height="22px"
            alt="Un signo de dólar tachado"
            title="No comercial"
          />
          <img
            style={{ 'margin-left': '3px', 'vertical-align': 'text-bottom' }}
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
            height="22px"
            alt="Flecha curvándose hacia si misma"
            title="ShareAlike"
          />

        </a>
      </p>
    </footer>
  );
}

export default Footer;
