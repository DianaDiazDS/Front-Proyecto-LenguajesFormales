document.getElementById("btnLogin").addEventListener("click", () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

 

  const URI = "http://localhost:4000/login/";
  const dataSend = {
    username: username,
    password: password,
  };
  fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataSend),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.state) {
       //esta data la envia  logincontroler: res.status(200).json({ state: true,data: user ,token });
     
//necesario para acceder a usuario y el id
        if (Array.isArray(data.data) && data.data.length > 0) {
          const firstUserData = data.data[0];
          const userId = firstUserData.id;
          console.log("ID del usuario:", userId, "hols",firstUserData.username)
          alert("ID del usuario:", userId, "hols",firstUserData.username);
          SaveLocalStorage("iduser", userId);
          
          // Puedes hacer algo con el ID aquí
        }
        // console.log("hola.....",data.data);

        // localStorage.setItem("username", data.username);
        // SaveLocalStorage("username", data2);
        window.location.replace("/dashboard-home");
        SaveLocalStorage("login", data.token);
      } else {
        Swal.fire({
          title: "Error de ingreso",
          text: "Revise el usuario o la contraseña.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Error de conexión",
        text: `${err}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
});

const SaveLocalStorage = (key, item) => {
  //conseguir elementos en localStorage
  let elementos = localStorage.getItem(key);
  //comprar si es un array
  if (Array.isArray(elementos)) {
    elementos.push(item);
  } else {
    //crear array
    elementos = item;
  }
  //guardar en el localStorage
  localStorage.setItem(key, elementos);
  //devolver objeto
  return item;
};



