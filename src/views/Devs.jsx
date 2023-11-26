import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Devs = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // Si no está autenticado, redirigir a la página de inicio
      navigate("/");
    } else {
      // Si está autenticado, cargar datos de los usuarios registrados
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/get_user_data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        // Mostrar notificación de error al obtener datos de usuario
        toast.error("Error al obtener datos de usuario.");
        console.log("Error al obtener datos de usuario:", response.statusText);
      }
    } catch (error) {
      // Mostrar notificación de error al realizar la solicitud
      toast.error("Error al realizar la solicitud al servidor.");
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleEditUser = (userId) => {
    // Lógica para editar usuario, por ejemplo, redirigir a una página de edición
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Lógica para eliminar usuario, por ejemplo, mostrar un cuadro de diálogo de confirmación
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmDelete) {
      // Lógica para eliminar el usuario, como hacer una solicitud DELETE al servidor
      console.log(`Eliminar usuario con ID: ${userId}`);

      // Mostrar notificación de éxito al eliminar usuario
      toast.success("Usuario eliminado exitosamente.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Usuarios Registrados</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre de Usuario</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {/* Botones para editar y eliminar usuarios */}
                <button
                  className="bg-blue-500 text-white py-1 px-2 mr-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleEditUser(user.id)}
                >
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <i className="fas fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Devs;


