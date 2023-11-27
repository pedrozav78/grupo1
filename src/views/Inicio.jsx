import React from "react";
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { RiLoginBoxLine } from "react-icons/ri";

export const Inicio = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex items-center justify-center">
      <div className="card">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          ¡Bienvenido a la Aplicación!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Parece que no estás autorizado. Por favor, inicia sesión o regístrate.
        </p>
        <div className="button-container">
          <Link
            to="/login"
            className="button bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold shadow-md transform transition duration-300 hover:scale-105 flex justify-left"
          >
            <span className="flex items-center">
              <LuLogIn className="block mr-1" />
            </span>
            Ir a Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="button bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold shadow-md transform transition duration-300 hover:scale-105 flex justify-right"
          >
            <span className="flex items-center">
              <RiLoginBoxLine className="block mr-1" />
            </span>
            Ir a Registro
          </Link>
        </div>
      </div>
    </div>
  );
};
