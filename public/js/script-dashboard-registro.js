const apiUrl = "http://localhost:4000/client";
const authorizationToken = localStorage.getItem("login");

fetch(apiUrl, {
  headers: {
    Authorization: `${authorizationToken}`,
  },
})
  .then((datos) => datos.json())
  .then((data) => {})
  .catch((error) => console.error(error));






const addClient = () => {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const celphone = document.getElementById("celphone").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  console.log("Se añadió correctamente el nuevo usuario")
  if (!name) {
    alert("Por favor, ingresa el nombre del cliente.");
    return;
  }

  validateFields(id, name, celphone, email,username, password);
  const hasErrors = Object.values(errorMessages).some(
    (message) => message !== ""
  );

  if (hasErrors) {
    mostrarMensajeError();
    return;
  }

  const newClient = {
    id: id,
    name: name,
    celphone: celphone,
    email: email,    
    username: username,
   password: password,
  };
//   console.log(
//    id ,
//  name ,
//   celphone,
//    email ,
//    username ,
//    password ,


// newClient);

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorizationToken}`,
    },
    body: JSON.stringify(newClient),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.state) {
        
        limpiarCampos();
        Swal.fire({
          title: "Registro exitoso",
          text: `El cliente ${name} ha sido registrado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al registrar el cliente",
          text: "Hubo un error al tratar de registrar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al agregar el cliente.");
    });
};

let errorMessages = {};
const limpiarCampos = () => {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("celphone").value = "";
    document.getElementById("email").value = "";
     document.getElementById("user").value = "";
   document.getElementById("password").value = "";
  };

const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "Id":
      const idPattern = /^[0-9]+$/;
      if (!idPattern.test(value) || parseInt(value, 10) === 0) {
        errorMessages[fieldName] =
          "El campo ID debe contener solo números y no ser igual a cero.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "Nombre":
      const nombrePattern = /^[\p{L}ÁÉÍÓÚáéíóúÑñ\s]+$/u;
      if (!nombrePattern.test(value) || value.length < 3) {
        errorMessages[fieldName] =
          "El campo Nombre debe contener solo letras y tener al menos 3 caracteres.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "Celphone":
      const celphonePattern = /^[0-9]{10}$/;
      if (!celphonePattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Celphone debe contener 10 dígitos numéricos.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "Email":
      const emailPattern =
        /^[\w-]+(?:\.[\w-]+)*@(?:gmail\.com|hotmail\.com|uptc\.edu\.co)$/;
      if (!emailPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Email debe tener un formato válido (@gmail.com, @hotmail.com, @uptc.edu.co).";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    default:
      break;
  }
};
const validateFields = (id, updatedName, updatedCelphone, updatedEmail) => {
  validateField("Id", id);
  validateField("Nombre", updatedName);
  validateField("Celphone", updatedCelphone);
  validateField("Email", updatedEmail);
  mostrarMensajeError();
};

const mostrarMensajeError = () => {
  const errorMessagesArray = Object.entries(errorMessages).filter(
    ([fieldName, message]) => message !== ""
  );

  if (errorMessagesArray.length > 0) {
    const errorMessageText = errorMessagesArray
      .map(([fieldName, message]) => `---${fieldName}: ${message}-`)
      .join("\n");

    Swal.fire({
      title: "Ingrese los campos correctamente.\n",
      text: errorMessageText,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const updateClient = (ClienteId1, clientId) => {
  const updatedName = document.getElementById("update-name" + clientId).value;
  const updatedCelphone = document.getElementById(
    "update-celphone" + clientId
  ).value;
  const updatedEmail = document.getElementById("update-email" + clientId).value;

  validateFields(ClienteId1, updatedName, updatedCelphone, updatedEmail);
  const hasErrors = Object.values(errorMessages).some(
    (message) => message !== ""
  );

  if (hasErrors) {
    mostrarMensajeError();
    return;
  }

  const updateData = {
    name: updatedName,
    celphone: updatedCelphone,
    email: updatedEmail,
  };

  fetch(
    `http://localhost:4000/client/${ClienteId1}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorizationToken}`,
      },
      body: JSON.stringify(updateData),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        Swal.fire({
          title: "Actualización exitosa",
          text: `El Cliente ha sido actualizado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al actualizar el cliente",
          text: "Hubo un error al tratar de actualizar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error de conexión",
        text: "Hubo un error al tratar de conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
};

const logOut = () => {
  localStorage.removeItem("login");
};
