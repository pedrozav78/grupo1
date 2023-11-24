import React from 'react';

export const RenderUser = (props) => {
  return (
    <div>
      {props.user && props.user.map((usuario, index) => (
        <div key={index}>
          <p>Nombre: {usuario.username}</p>
          <p>Apellido: {usuario.password}</p>
          <p>Email: {usuario.email}</p>
        </div>
      ))}
    </div>
  );
};
