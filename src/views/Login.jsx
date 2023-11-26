import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: clave }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Usuario autenticado correctamente");
        setError("");
        const token = responseData.access;

        setAuthToken(token);
        fetchData();
        toast.success("Inicio de sesión exitoso");
        toast.success("Serás redirigido a la pestaña de Devs en unos segundos.");

        // Redirigir después de un cierto tiempo
        setTimeout(() => {
          navigate("/devs");
        }, 5000);

      } else {
        setError(responseData.detail || "Error de autenticación");
        toast.error(`Error: ${responseData.detail || "Error de autenticación"}`);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error al comunicarse con el servidor");
      toast.error("Error al comunicarse con el servidor");
    }
  };

  const fetchData = async () => {
    if (authToken) {
      try {
        const response = await fetch("http://localhost:8000/auth/check_token", {
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
    } else {
      console.error("No hay token de autenticación disponible.");
    }
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
                htmlFor="username"
                className="block text-base mb-2 text-blue-800"
              >
                Nombre de Usuario
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-blue-300 focus:border-blue-500"
                type="text"
                id="username"
                name="username"
                placeholder="Nombre de Usuario"
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
      <ToastContainer />
    </div>
  );
};

