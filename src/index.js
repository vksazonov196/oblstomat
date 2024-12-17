import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Clarity from '@microsoft/clarity';

const projectId = "pcqzk23pf3"

Clarity.init(projectId);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
