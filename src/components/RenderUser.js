import React from 'react';

export const RenderUser = ({ users }) => {
  return (
    <div>
      {users.map((usuario, index) => (
        <div key={index}>
          <p>Nombre: {usuario.nombre}</p>
          <p>Apellido: {usuario.apellido}</p>
          <p>Email: {usuario.email}</p>
        </div>
      ))}
    </div>
  );
};