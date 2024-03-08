const apiUrl = "http://localhost:4000/client";
const authorizationToken = localStorage.getItem("login");
const iduser = localStorage.getItem("iduser");




document.addEventListener("DOMContentLoaded", () => {
  loadTable();
});


fetch(apiUrl, {
  headers: {
    Authorization: `${authorizationToken}`,
  },
})
  .then((datos) => datos.json())
  .then((data) => { })
  .catch((error) => console.error(error));



const unlockInputs = () => {
  // Desbloquear los inputs para permitir la edición
  document.getElementById("update-name").disabled = false;
  document.getElementById("update-celphone").disabled = false;
  document.getElementById("update-email").disabled = false;
  document.getElementById("update-username").disabled = true;
  document.getElementById("update-password").disabled = true;
  document.getElementById("acceptButton").classList.remove("d-none");
  document.getElementById("cancelButton").classList.remove("d-none");
  document.getElementById("updateButton").classList.add("d-none");

  loadTable();
};



function acceptUpdate() {
  updateClient()
  document.getElementById("updateButton").classList.remove("d-none");

}
function cancelUpdate() {  
  document.getElementById("acceptButton").classList.add("d-none");
  document.getElementById("cancelButton").classList.add("d-none");
  document.getElementById("updateButton").classList.remove("d-none");
 disableInputs();
}

const disableInputs = () => {
  document.getElementById("update-name").disabled = true;
  document.getElementById("update-celphone").disabled = true;
  document.getElementById("update-email").disabled = true;
  document.getElementById("update-username").disabled = true;
  document.getElementById("update-password").disabled = true;
};

const updateClient = () => {
 
  const updatedName = document.getElementById("update-name").value;
  const updatedCelphone = document.getElementById("update-celphone").value;
  const updatedEmail = document.getElementById("update-email").value;
  const updatedUsername = document.getElementById("update-username").value;
  const updatedPassword = document.getElementById("update-password").value;

  
  validateFields(iduser, updatedName, updatedCelphone, updatedEmail, updatedUsername, updatedPassword);
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
    updatedUsername: updatedUsername,
    updatedPassword: updatedPassword,
  };

  fetch(
    `${apiUrl}/${iduser}`,
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
          text: `Los cambios han sido guardados.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        disableInputs();
        document.getElementById("cancelButton").classList.add("d-none");
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
    document.getElementById("acceptButton").classList.add("d-none");
};



  const loadTable = () => {
    const iduser = parseInt(localStorage.getItem("iduser"));
  console.log(iduser)
    if (!iduser || iduser === "undefined") {
      // Manejar el caso en que iduser no esté definido o sea "undefined"
      return;
    }
  
   
    return new Promise((resolve, reject) => {
      fetch(`${apiUrl}/${iduser}`, {
        headers: {
          Authorization: `${authorizationToken}`,
        },
      })
        .then((datos) => datos.json())
        .then((datos) => {
          console.log(datos);
          datos.data.forEach((cliente) => {
            document.getElementById("update-name").value = cliente.name;
            document.getElementById("update-celphone").value = cliente.celphone || '';
            document.getElementById("update-email").value = cliente.email || '';
            document.getElementById("update-username").value = cliente.username || '';
            document.getElementById("update-password").value = cliente.password|| '';



            const updateNameInput = document.getElementById("update-name");
            const updateCelphoneInput = document.getElementById("update-celphone");
            const updateEmailInput = document.getElementById("update-email");
            const updateUsernameInput = document.getElementById("update-username");
            const updatePasswordInput = document.getElementById("update-password");
  
            // Actualiza los valores de los campos directamente
            updateNameInput.value = cliente.name;
            updateCelphoneInput.value = cliente.celphone || '';
            updateEmailInput.value = cliente.email || '';
            updateUsernameInput.value = cliente.username || '';
            updatePasswordInput.value = cliente.password || '';
  
            // Cambia la visibilidad de los botones
         
        });
        })
        .catch((error) => console.log(error))
      
     
    });
  };



  const drop = (id) => {
    const URI = `http://localhost:4000/client/${id}`;
    fetch(URI, {
      method: "DELETE",
      headers: {
        Authorization: `${authorizationToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.state) {
          loadTable();
          Swal.fire({
            title: "Eliminación exitosa",
            text: `El cliente fue eliminado.`,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Error al eliminar el cliente",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocurrió un error al eliminar el cliente");
      });
  };

  const limpiarCampos = () => {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("celphone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("user").value = "";
    document.getElementById("passwordRegister").value = "";
  };

  const addClient = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const celphone = document.getElementById("celphone").value;
    const email = document.getElementById("email").value;
    const user = document.getElementById("user").value;
   const password= document.getElementById("passwordRegister").value;

    if (!name) {
      alert("Por favor, ingresa el nombre del cliente.");
      return;
    }

    validateFields(id, name, celphone, email, user, password);
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
      username: user,
      password:password
    };

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
          loadTable();
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

  

  const logOut = () => {
    localStorage.removeItem("login");
  };
