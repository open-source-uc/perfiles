import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/extensions
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
