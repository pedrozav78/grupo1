import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");

  const checkUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: clave,
        }),
      });

      if (response.ok) {
        console.log("Usuario autenticado correctamente");
        setError("");
        const responseData = await response.json();
        const token = responseData.access;

        setAuthToken(token);
        fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error al comunicarse con el servidor");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/data", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos obtenidos:", data);
      } else {
        console.log("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-700 to-blue-800">
      <div className="w-full lg:w-3/4 xl:w-1/2 p-6 shadow-lg bg-white rounded-md flex relative overflow-hidden">
        <div className="w-full lg:w-2/3 relative z-10">
          <h1 className="text-3xl text-center font-semibold text-blue-800">
            <i className="fas fa-user"></i> Inicio de Sesión
          </h1>
          <hr className="my-4 border-blue-300"></hr>
          <form onSubmit={checkUser}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-base mb-2 text-blue-800"
              >
                Correo
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-blue-300 focus:border-blue-500"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-base mb-2 text-blue-800"
              >
                Contraseña
              </label>
              <input
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-blue-300 focus:border-blue-500"
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 w-full rounded-md hover:bg-blue-600 font-semibold shadow-md transform transition duration-300 hover:scale-105"
              >
                <i className="fas fa-sign-in-alt"></i>
                &nbsp;&nbsp;Iniciar Sesión
              </button>
              <p className="mt-4 text-blue-800 text-center">
                ¿Aún no tienes cuenta?&nbsp;
                <a
                  href="/registro"
                  className="underline hover:text-blue-600 hover:underline"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/3 absolute inset-y-0 right-0">
          <img
            src="programacion2.jpg"
            alt="Imagen"
            className="h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};