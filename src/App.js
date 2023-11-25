import './App.css';
import React, { useState, useEffect } from 'react';
import { Registro } from './components/Registro';
import { RenderUser } from './components/RenderUser';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/auth/login')  // Ajustado según la configuración del back en settings.py (backend)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className=" ">Bienvenido</h1>
        <Registro />
        {/* Renderizar los usuarios obtenidos de la API */}
        <RenderUser users={users} />
      </header>
    </div>
  );
}

export default App;
