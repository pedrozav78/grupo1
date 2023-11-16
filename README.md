# Proyecto React con Backend Django

Este proyecto incluye una aplicación React front-end que se comunica con un backend Django. A continuación, se detallan algunos comandos y pasos útiles para comenzar.

## Comandos Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm start`

Inicia la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando realices cambios.\
También puedes ver cualquier error de lint en la consola.

### `npm test`

Lanza el corredor de pruebas en el modo de observación interactiva.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para obtener más información.

### `npm run build`

Compila la aplicación para producción en la carpeta `build`.\
Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

El resultado se minimiza y los nombres de archivo incluyen los hashes.\
Tu aplicación está lista para ser desplegada.

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para obtener más información.

### `npm run eject`

**Nota: esto es una operación de una sola vía. ¡Una vez que ejecutes `eject`, no podrás revertirlo!**

Si no estás satisfecho con la herramienta de compilación y las opciones de configuración, puedes ejecutar `eject` en cualquier momento. Este comando eliminará la dependencia de construcción única de tu proyecto.

En cambio, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas control total sobre ellos. Todos los comandos excepto `eject` seguirán funcionando, pero apuntarán a los scripts copiados para que puedas ajustarlos. En este punto, estás por tu cuenta.

No es necesario que uses `eject`. El conjunto de características curadas es adecuado para implementaciones pequeñas y medianas, y no debes sentirte obligado a usar esta característica. Sin embargo, entendemos que esta herramienta no sería útil si no pudieras personalizarla cuando estés listo.

## Integración con Backend Django

Asegúrate de tener tu servidor Django en ejecución. La aplicación React está configurada para realizar solicitudes al backend Django.

### Configuración CORS en Django

Asegúrate de haber configurado CORS en tu proyecto de Django para permitir solicitudes desde el dominio donde se ejecuta tu aplicación React. Consulta la sección sobre CORS en el archivo `settings.py` de tu proyecto Django.

### Actualización de Componentes React

- **App.js:** Se ha actualizado para realizar solicitudes a la API Django y mostrar usuarios.
  
  ```jsx
  // Código actualizado de App.js
  // ...
