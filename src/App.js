// import './App.css';
import React, { useState, useEffect } from 'react';
import { Registro } from './components/Registro';
import { Login } from './components/login';
import { RenderUser } from './components/RenderUser';
import {Navbar} from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users/')  // Ajustado según la configuración del back en settings.py (backend)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="flex-col bg-white ">
      <BrowserRouter >
      <Navbar/>
      <Routes>
        <Route path='/registro'element={<Registro/>} />
        <Route path='/login' element={<Login/>} />      
        <Route path='/' element={""} />    
      </Routes>
    </BrowserRouter>
      
        {/* Renderizar los usuarios obtenidos de la API */}
        <RenderUser users={users} />
    </div>
  );
}

export default App;