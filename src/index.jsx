import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Registro } from "./views/Registro.jsx";
import { Login } from "./views/Login.jsx";
import { Inicio } from "./views/Inicio.jsx";
import Devs from "./views/Devs.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <Inicio />,
    errorElement: <div>Ha ocurrido un error.</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Ha ocurrido un error.</div>,
  },
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <div>Ha ocurrido un error.</div>,
  },
  {
    path: "/devs",
    element: <Devs />,
    errorElement: <div>Ha ocurrido un error.</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
