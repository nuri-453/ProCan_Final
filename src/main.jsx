import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';  // <-- Dikkat, .jsx olarak yaz!
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
