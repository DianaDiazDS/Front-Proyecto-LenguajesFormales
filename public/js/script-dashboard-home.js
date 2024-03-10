
/*logOut():

Descripción: Este método cierra la sesión del usuario, eliminando el token de autorización del almacenamiento local.
Parámetros: Ninguno.
Retorna: Ninguno.
Uso: Se utiliza para cerrar la sesión del usuario y redirigirlo a la página de inicio de sesión. */
const logOut = () => {
  localStorage.removeItem("login");
};

/*isAuthenticated():

Descripción: Este método verifica si el usuario está autenticado comprobando la existencia del token de autorización en el almacenamiento local.
Parámetros: Ninguno.
Retorna:
Booleano: true si el usuario está autenticado, false en caso contrario.
Uso: Se utiliza para determinar si el usuario está autenticado antes de permitir el acceso a ciertas funcionalidades de la aplicación. */
const isAuthenticated = () => {
  const authorizationToken = localStorage.getItem("login");
  return authorizationToken !== null && authorizationToken !== undefined;
};


/*requireLogin():

Descripción: Este método redirige al usuario a la página de inicio de sesión si no está autenticado.
Parámetros: Ninguno.
Retorna: Ninguno.
Uso: Se utiliza para asegurarse de que el usuario esté autenticado antes de acceder a ciertas partes de la aplicación. Si el usuario no está autenticado, se redirige a la página de inicio de sesión. */
const requireLogin = () => {
  if (!isAuthenticated()) {
    window.location.replace("/login");
  }
};
// requireLogin();
