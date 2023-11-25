import React, { useState } from "react";

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
        // El usuario existe en la base de datos y ha iniciado sesión correctamente
        console.log("Usuario autenticado correctamente");
        setError("");
        const responseData = await response.json();
        const token = responseData.access; // Obtener el token de acceso en lugar de "token"

        setAuthToken(token);
        fetchData();
      } else {
        // El usuario no existe o las credenciales son incorrectas
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error al comunicarse con el servidor");
    }
  };

  // Función para realizar una solicitud autenticada al backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/data", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // La solicitud se realizó correctamente con autenticación
        const data = await response.json();
        console.log("Datos obtenidos:", data);
      } else {
        // La solicitud no se realizó correctamente, el token puede haber expirado
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
    <>
      <div className="flex justify-center items-center h-screen bg-blue-800">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-3xl block text-center font-semibold">
            <i className="fa-solid fa-user"></i> Inicio de sesión
          </h1>
          <hr className="mt-3"></hr>
          <form action="POST">
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Correo
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Contraseña
            </label>
            <input
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
            />
            </div>
            <div className="mt-3 flex">
              <div>
                
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-blue-700 bg-blue-700 text-white py-1 w-full rounded-md hover:bg-blue-800
                hover:text-white font-semibold hover:shadow-md hover:shadow-sky-400"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                &nbsp;&nbsp;Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};