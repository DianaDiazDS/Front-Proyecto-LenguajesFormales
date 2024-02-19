const logOut = () => {
  localStorage.removeItem("login");
};

const isAuthenticated = () => {
  const authorizationToken = localStorage.getItem("login");
  return authorizationToken !== null && authorizationToken !== undefined;
};

const requireLogin = () => {
  if (!isAuthenticated()) {
    window.location.replace("/login");
  }
};
// requireLogin();
