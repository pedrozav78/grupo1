import React, { useState } from "react";

const data = [
  { id: 1, nombre: "Diego", correo: "diego1@gmail.com", clave: "1234"},,
];

export const Devs = () => {
  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    clave: ""
  });
  const [rowData, setRowData] = useState(data);

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = (dato) => {
    const newData = rowData.map((registro) =>
      dato.id === registro.id ? { ...registro, ...dato } : registro
    );
    setRowData(newData);
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    const opcion = window.confirm(`¿Estás seguro que deseas eliminar el elemento ${dato.id}?`);
    if (opcion) {
      const newData = rowData.filter((registro) => dato.id !== registro.id);
      setRowData(newData);
      setModalActualizar(false);
    }
  };

  const insertar = () => {
    const valorNuevo = { ...form, id: rowData.length + 1 };
    const newList = [...rowData, valorNuevo];
    setModalInsertar(false);
    setRowData(newList);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={mostrarModalInsertar}
        >
          Crear
        </button>
        <br />
        <br />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Contraseña</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
          </thead>

          <tbody>
            {rowData.map((dato) => (
              <tr key={dato.id}>
                <td className="border px-4 py-2">{dato.id}</td>
                <td className="border px-4 py-2">{dato.nombre}</td>
                <td className="border px-4 py-2">{dato.correo}</td>
                <td className="border px-4 py-2">{dato.clave}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => mostrarModalActualizar(dato)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => eliminar(dato)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalActualizar && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Editar Registro</h3>
            <div className="mb-4">
              <label className="block mb-2">ID:</label>
              <input
                className="border w-full p-2"
                readOnly
                type="text"
                value={form.id}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nombre:</label>
              <input
                className="border w-full p-2"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={form.nombre}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Correo:</label>
              <input
                className="border w-full p-2"
                name="correo"
                type="text"
                onChange={handleChange}
                value={form.correo}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Contraseña:</label>
              <input
                className="border w-full p-2"
                name="clave"
                type="text"
                onChange={handleChange}
                value={form.clave}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => editar(form)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={cerrarModalActualizar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {modalInsertar && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Crear Dev:</h3>
            <div className="mb-4">
              <label className="block mb-2">ID:</label>
              <input
                className="border w-full p-2"
                readOnly
                type="text"
                value={rowData.length + 1}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nombre:</label>
              <input
                className="border w-full p-2"
                name="nombre"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Correo:</label>
              <input
                className="border w-full p-2"
                name="correo"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Contraseña:</label>
              <input
                className="border w-full p-2"
                name="clave"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={insertar}
              >
                Insertar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={cerrarModalInsertar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}