import React, { Fragment, useState } from 'react';
import { RenderUser } from './RenderUser';

export const Registro = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState([]);

  function addUser(e) {
    e.preventDefault();

    fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido, email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User added successfully:', data);
        setEstado([...estado, data]); // Actualizar el estado con el nuevo usuario
      })
      .catch(error => console.error('Error adding user:', error));
  }

  return (
    <div className="flex flex-row">
      <Fragment>
        <form onSubmit={(e) => addUser(e)}>
          <div className="basis-1/2">
            <input
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-r-3xl"
              type="text"
              id="nombre"
              name="nombre"
              placeholder='Nombre'
            />
          </div>
          <br />
          <div className="basis-1/2">
            <input
              onChange={(e) => setApellido(e.target.value)}
              className="rounded-r-3xl"
              type="text"
              id="apellido"
              name="apellido"
              placeholder='apellido'
            />
          </div>
          <br />
          <div className="basis-1/2">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-r-3xl"
              type="text"
              id="email"
              name="email"
              placeholder='Email'
            />
          </div>
          <br />
          <button type="submit" className="bg-sky-700 px-4 py-2 rounded-r-3xl text-white hover:bg-sky-800 sm:px-8 sm:py-3">Registrarme</button>
        </form>
      </Fragment>
      <RenderUser user={estado} />
    </div>
  );
};




