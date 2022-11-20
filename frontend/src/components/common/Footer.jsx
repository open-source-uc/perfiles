import * as React from 'react';
// import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-50 bg-osuc-black-3 text-osuc-white-3 py-6 text-center bottom-0 w-full">
      {/* Código autogenerado por https://chooser-beta.creativecommons.org/ */}
      <p>
        <a
          // eslint-disable-next-line react/no-unknown-property
          property="dct:title"
          href="https://perfiles.osuc.dev/"
          className="underline"
        >
          Members OSUC

        </a
        >
        {' '}
        de
        {' '}
        <a
        // eslint-disable-next-line react/no-unknown-property
          property="cc:attributionName"
          href="https://osuc.dev/"
          className="underline"
        >
          Open Source UC

        </a
        >
        { ' '}
        está licenciado bajo
        { ' '}
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          className="underline"
        >
          CC BY-NC-SA 4.0
        </a>
      </p>
    </footer>
  );
}
