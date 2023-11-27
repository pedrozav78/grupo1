import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdEmail } from "react-icons/md";

export const Registro = () => {
  const navigate = useNavigate();

  const [usuario, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [estado, setEstado] = useState([]);

  function addUser(e) {
    e.preventDefault();

    if (!usuario || !email || !clave) {
      toast.error("Los campos no pueden estar vacíos");
      return; // Detener el proceso si hay campos vacíos
    }

    fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: usuario, password: clave, email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuario ya existe");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User added successfully:", data);
        setEstado([...estado, data]);
        toast.success("¡Usuario registrado exitosamente!");
        toast.success(
          "Serás redirigido a la pestaña de Devs en unos segundos."
        );

        // Redirigir después de un cierto tiempo
        setTimeout(() => {
          navigate("/devs");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        if (error.message === "Usuario ya existe") {
          toast.error("¡El usuario ya está registrado!");
        } else {
          toast.error("¡Hubo un error al registrar el usuario!");
        }
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-800 to-blue-500">
      <div className="w-full lg:w-3/4 xl:w-1/2 p-6 shadow-lg bg-white rounded-md flex relative overflow-hidden">
        <div className="w-full lg:w-2/3 relative z-10 pr-9 pl-6">
          <h1 className="text-3xl text-center font-semibold text-blue-800 flex items-center justify-center">
            <SlArrowLeft className="mr-1" />
            Registro
            <SlArrowRight className="ml-1" />
          </h1>
          <hr className="my-4 border-blue-300"></hr>
          <form onSubmit={(e) => addUser(e)}>
            <div className="mt-4 relative">
              <label
                htmlFor="nombre"
                className="flex text-base mb-2 text-blue-800"
              >
                <FaUser className="block ml-1 mt-1 mr-1 text-black" />
                Nombre de Usuario
              </label>
              <input
                onChange={(e) => setNombre(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-black focus:border-blue-500"
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Usuario"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="flex text-base mb-2 text-blue-800"
              >
                <MdEmail className="block ml-1 mt-1 mr-1 text-black" />
                Correo
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-black focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="clave"
                className="flex text-base mb-2 text-blue-800"
              >
                <FaLock className="block ml-1 mt-1 mr-1 text-black" />
                Contraseña
              </label>
              <input
                onChange={(e) => setClave(e.target.value)}
                className="border w-full text-base px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md border-black focus:border-blue-500"
                type="password"
                id="clave"
                name="clave"
                placeholder="Clave"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="flex justify-center items-center bg-blue-600 text-white py-3 w-full rounded-md hover:bg-blue-700 font-semibold shadow-md transform transition duration-300 hover:scale-105 text-center align-middle"
              >
                <span className="flex items-center">
                  <FaSignInAlt className="block mr-1" />
                </span>
                Registrarse
              </button>
              <p className="mt-4 text-blue-800 text-center">
                ¿Ya tienes una cuenta?&nbsp;
                <a
                  href="/login"
                  className="underline hover:text-blue-600 hover:underline"
                >
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/3 absolute inset-y-0 right-0">
          <img
            src="programacion1.jpg"
            alt="Imagen"
            className="h-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registro;
