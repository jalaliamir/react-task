import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SelectProvider } from './Context/SelectContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectProvider>
      <App />
    </SelectProvider>
  </React.StrictMode>
);
