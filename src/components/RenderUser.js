import React from 'react';

export const RenderUser = (props) => {
  return (
    <div>
      {props.user && props.user.map((usuario, index) => (
        <div key={index}>
          <p>Usuario: {usuario.username}</p>
          <p>Clave: {usuario.password}</p>
          <p>Email: {usuario.email}</p>
        </div>
      ))}
    </div>
  );
};
