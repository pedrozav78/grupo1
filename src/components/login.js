import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

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
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
            />
            </div>
            <div className="mt-3 flex">
              <div>
                <a href="#" className="text-indigo-800 font-semibold">
                  ¿No tienes cuenta? Registrate
                </a>
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
