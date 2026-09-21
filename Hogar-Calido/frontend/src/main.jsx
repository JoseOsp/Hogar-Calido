import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './Context/AuthContext'; // <--- Importamos el contexto

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* <--- Envolvemos la app aquí */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);