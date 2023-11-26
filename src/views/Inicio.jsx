import React from "react";
import { Link } from "react-router-dom";

export const Inicio = () => {
  const [showMessage, setShowMessage] = React.useState(true);

 return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 min-h-screen flex items-center justify-center">
      <div className="card">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          ¡Bienvenido a la Aplicación!
        </h1>
        {showMessage && (
          <p className="text-lg text-gray-700 mb-4">
            Parece que no estás autorizado. Por favor, inicia sesión o regístrate.
          </p>
        )}
        <div className="button-container">
          <Link
            to="/login"
            className="button bg-blue-500 text-white hover:bg-blue-600"
          >
            Ir a Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="button bg-green-500 text-white hover:bg-green-600"
          >
            Ir a Registro
          </Link>
        </div>
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          onClick={() => setShowMessage(false)}
        >
          Ocultar este mensaje
        </button>
      </div>
    </div>
  );
};
