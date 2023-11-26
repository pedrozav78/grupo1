import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido!</h1>
        <h1 className="text-3xl font-bold mb-4">No estás autorizado. Por favor, inicia sesión o registrate.</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Ir a Login
          </Link>
          <Link
            to="/registro"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Ir a Registro
          </Link>
        </div>
      </div>
    </div>
  );
};
