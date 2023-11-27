import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSignOutAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Devs = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const authToken = sessionStorage.getItem("authToken");
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
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Añadir la propiedad isEditing a cada usuario para controlar la edición en línea
        const userDataWithEdit = data.map((user) => ({ ...user, isEditing: false }));
        setUserData(userDataWithEdit);
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

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/delete_user/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        // Eliminación exitosa
        toast.success("Usuario eliminado exitosamente.");
        // Actualizar la lista de usuarios después de la eliminación
        fetchUserData();
      } else {
        // Mostrar notificación de error al eliminar usuario
        toast.error("Error al eliminar usuario.");
        console.log("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      // Mostrar notificación de error al realizar la solicitud
      toast.error("Error al realizar la solicitud al servidor.");
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const handleAddUser = () => {
    // Añadir un nuevo usuario con un objeto de usuario inicial
    setUserData((prevData) => [
      ...prevData,
      {
        id: Date.now(), // Utilizar la marca de tiempo actual como identificador temporal
        username: "",
        email: "",
        isEditing: true, // Entrar en modo de edición para el nuevo usuario
      },
    ]);
  };

  const handleEditUser = (userId) => {
    // Mostrar o ocultar campos de edición en línea
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, isEditing: !user.isEditing } : user
      )
    );
  };

  const handleSaveEdit = async (userId) => {
    // Lógica para guardar la edición en línea
    const editedUser = userData.find((user) => user.id === userId);

    try {
      const response = await fetch(`http://localhost:8000/auth/edit_user/${editedUser.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        // Edición exitosa
        toast.success("Usuario editado exitosamente.");
        // Actualizar la lista de usuarios después de la edición
        fetchUserData();
      } else {
        // Mostrar notificación de error al editar usuario
        toast.error("Error al editar usuario.");
        console.log("Error al editar usuario:", response.statusText);
      }
    } catch (error) {
      // Mostrar notificación de error al realizar la solicitud
      toast.error("Error al realizar la solicitud al servidor.");
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Usuarios Registrados</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
          onClick={handleAddUser}
        >
          <FontAwesomeIcon icon={faUserPlus} /> Agregar Usuario
        </button>
      </div>
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
              <td className="border border-gray-300 p-2">
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUserData((prevData) =>
                        prevData.map((u) =>
                          u.id === user.id ? { ...u, username: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.isEditing ? (
                  <button
                    className="bg-blue-500 text-white py-1 px-2 mr-2 rounded-md hover:bg-blue-600"
                    onClick={() => handleSaveEdit(user.id)}
                  >
                    Guardar
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 mr-2 rounded-md hover:bg-blue-600"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-gray-500 text-white py-1 px-2 mt-4 rounded-md hover:bg-gray-600"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
      </button>
      <ToastContainer />
    </div>
  );
};

export default Devs;


