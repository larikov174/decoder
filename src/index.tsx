import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Logs} from './components/logs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Logs />
  </React.StrictMode>,
);
