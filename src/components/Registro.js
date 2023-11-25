import React, { Fragment, useState } from "react";
import { RenderUser } from "./RenderUser";

export const Registro = (props) => {
  const [usuario, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [estado, setEstado] = useState([]);

  function addUser(e) {
    e.preventDefault();

    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usuario, password: clave, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User added successfully:", data);
        setEstado([...estado, data]); // Actualizar el estado con el nuevo usuario
      })
      .catch((error) => console.error("Error adding user:", error));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-800">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">
          <i className="fa-solid fa-user"></i> Registro
        </h1>
        <hr className="mt-3"></hr>
        <Fragment>
          <form onSubmit={(e) => addUser(e)}>
            <div className="mt-3">
              <label for="nombre" className="block text-base mb-2">
                Nombre
              </label>
              <input
                onChange={(e) => setNombre(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
              />
            </div>
            <div className="mt-3">
              <label for="email" className="block text-base mb-2">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
                type="email"
                id="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="mt-3">
              <label for="clave" className="block text-base mb-2">
                Clave
              </label>
              <input
                onChange={(e) => setClave(e.target.value)}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:shadow-black focus:shadow-md rounded-md border-gray-500"
                type="password"
                id="clave"
                name="clave"
                placeholder="clave"
              />
            </div>
            <div className="mt-3 flex">
              <div></div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-blue-700 bg-blue-700 text-white py-1 w-full rounded-md hover:bg-blue-800
                hover:text-white font-semibold hover:shadow-md hover:shadow-sky-400"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                &nbsp;&nbsp;Registrarse
              </button>
            </div>
          </form>
        </Fragment>
        <RenderUser user={estado} />
      </div>
    </div>
  );
};
