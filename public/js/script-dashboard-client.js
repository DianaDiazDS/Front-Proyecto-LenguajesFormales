const apiUrl = "http://localhost:4000/client";
// const authorizationToken = localStorage.getItem("login");
const authorizationToken = localStorage.getItem("login");
const iduser = localStorage.getItem("iduser");


// const isAuthenticated = () => {
//   return authorizationToken !== null && authorizationToken !== undefined;
// };

// const requireLogin = () => {
//   if (!isAuthenticated()) {
//     window.location.replace("/login");
//   }
// };
// requireLogin();

fetch(apiUrl, {
  headers: {
    Authorization: `${authorizationToken}`,
  },
})
  .then((datos) => datos.json())
  .then((data) => { })
  .catch((error) => console.error(error));

// const loadTable = () => {
//   document.getElementById("table-body").innerHTML = "";
//   document.getElementById("select-id").innerHTML = "";
//   const optionDefault = document.createElement("option");
//   optionDefault.value = "Seleccione un ID";
//   optionDefault.innerText = "Seleccione un ID";
//   document.getElementById("select-id").appendChild(optionDefault);
//   console.log("iduser ",iduser )

//   return new Promise((resolve, reject) => {
//     fetch(apiUrl, {
//       headers: {
//         Authorization: `${authorizationToken}`,
//       },
//     })
//       .then((datos) => datos.json())
//       .then((datos) => {
//         const select = document.getElementById("select-id");

//         datos.data.forEach((cliente) => {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//                 <td>${cliente.id}</td>
//                 <td>${cliente.name}</td>
//                 <td>${cliente.celphone || "N/A"}</td>
//                 <td>${cliente.email || "N/A"}</td>
//                 <td>      

//                     <i class="bi bi-pencil-fill"
//                     type="button" 
//                     data-bs-toggle="modal"
//                     data-bs-target="#editModal${cliente._id}" 
//                     style="color: #FFC300; font-size: 2rem;">
//                     </i>
//                     <!-- Modal -->
//                     <div class="modal fade" id="editModal${
//                       cliente._id
//                     }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h1 class="modal-title fs-5" id="editModalLabel">Editar Cliente</h1>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div class="modal-body">            

//                                     <div class="mb-3">
//                                         <label for="update-name" class="form-label">Nombre</label>
//                                         <input type="text" class="form-control" id="update-name${
//                                           cliente._id
//                                         }" value="${cliente.name}">
//                                     </div>
//                                     <div class="mb-3">
//                                         <label for="update-celphone" class="form-label">Teléfono</label>
//                                         <input type="tel" class="form-control" id="update-celphone${
//                                           cliente._id
//                                         }" value="${cliente.celphone}">
//                                     </div>
//                                     <div class="mb-3">
//                                         <label for="update-email" class="form-label">Correo Electrónico</label>
//                                         <input type="email" class="form-control" id="update-email${
//                                           cliente._id
//                                         }" value="${cliente.email}">
//                                     </div>
//                                 </div>
//                                 <div class="modal-footer">                           

//                                     <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
//                                 <button type="button" class="btn btn-primary" onclick="updateClient('${
//                                   cliente.id
//                                 }' , '${
//             cliente._id
//           }')">Actualizar Cliente</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                 </td> 
//                 <td><i class="bi bi-x-circle" data-value='${
//                   cliente._id
//                 }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>


//             `;

//           const option = document.createElement("option");
//           option.value = cliente.id;
//           option.innerText = cliente.id;
//           select.appendChild(option);

//           document.getElementById("table-body").appendChild(row);
//         });
//       })
//       .catch((error) => console.log(error));
//   });
// };


const unlockInputs = () => {
  // Desbloquear los inputs para permitir la edición
  document.getElementById("update-name").disabled = false;
  document.getElementById("update-celphone").disabled = false;
  document.getElementById("update-email").disabled = false;
  document.getElementById("update-username").disabled = false;
  document.getElementById("update-password").disabled = false;
  document.getElementById("acceptButton").classList.remove("d-none");
  document.getElementById("cancelButton").classList.remove("d-none");
  document.getElementById("updateButton").classList.add("d-none");

};
//funciones para actualizar

function acceptUpdate() {
  updateClient()
  document.getElementById("updateButton").classList.remove("d-none");

}
function cancelUpdate() {  
  document.getElementById("acceptButton").classList.add("d-none");
  document.getElementById("cancelButton").classList.add("d-none");
  document.getElementById("updateButton").classList.remove("d-none");
}

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


//es para una tabla 
const loadTable2 = () => {
  document.getElementById("table-body").innerHTML = "";

  const iduser = localStorage.getItem("iduser");
  console.log(iduser);

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
        datos.data.forEach((cliente) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.name}</td>
          <td>${cliente.celphone || "N/A"}</td>
          <td>${cliente.email || "N/A"}</td>
          <td>      
              <!-- Resto del contenido del row... -->
          </td> 
          <td>
              <i class="bi bi-x-circle" data-value='${cliente._id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
          </td>
        `;

          document.getElementById("table-body").appendChild(row);

        });
        })
          .catch((error) => console.log(error));
      });
  };
//es para fromulario
  const loadTable = () => {
    const iduser = localStorage.getItem("iduser");
  
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
          datos.data.forEach((cliente) => {
            document.getElementById("update-name").value = cliente.name;
            document.getElementById("update-celphone").value = cliente.celphone || '';
            document.getElementById("update-email").value = cliente.email || '';
            document.getElementById("update-username").value = cliente.username || '';
            document.getElementById("update-password").value = cliente.password|| '';



          // Actualiza el formulario con los datos del cliente
          // document.getElementById("client-details-form").innerHTML = `
          //   <div class="mb-3">
          //     <label for="update-name" class="form-label">Nombre</label>
          //     <input type="text" class="form-control" id="update-name" value="${cliente.name}" disabled>
          //   </div>
          //   <div class="mb-3">
          //     <label for="update-celphone" class="form-label">Teléfono</label>
          //     <input type="tel" class="form-control" id="update-celphone" value="${cliente.celphone || ''}" disabled>
          //   </div>
          //   <div class="mb-3">
          //     <label for="update-email" class="form-label">Correo Electrónico</label>
          //     <input type="email" class="form-control" id="update-email" value="${cliente.email || ''}" disabled>
          //   </div>
          //   <!-- Agrega aquí otros campos del cliente según sea necesario... -->
          // `;
        });
        })
        .catch((error) => console.log(error));
    });
  };




  loadTable();

  const findById = () => {
    const option = document.getElementById("select-id");
    if (option.value !== "Seleccione un ID") {
      return new Promise((resolve, reject) => {
        fetch(
          `http://localhost:4000/client/${option.value}`,
          {
            headers: {
              Authorization: `${authorizationToken}`,
            },
          }
        )
          .then((data) => {
            if (!data.ok) {
              throw new Error(`Error: ${data.status} - ${data.statusText}`);
            }
            return data.json();
          })
          .then((result) => {
            const datos = result.data[0];
            document.getElementById("table-body").innerHTML = "";
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${datos.id}</td>
                    <td>${datos.name}</td>
                    <td>${datos.celphone || "N/A"}</td>
                    <td>${datos.email || "N/A"}</td>
                    <td>      
                    <i class="bi bi-pencil-fill"
                    type="button" 
                    data-bs-toggle="modal"
                    data-bs-target="#editModal${datos._id}" 
                    style="color: #FFC300; font-size: 2rem;">
                    </i>
            
                    <!-- Modal -->
                    <div class="modal fade" id="editModal${datos._id
              }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editModalLabel">Editar Cliente</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">               
                
                                    <div class="mb-3">
                                        <label for="update-name" class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="update-name${datos._id
              }" value="${datos.name}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-celphone" class="form-label">Teléfono</label>
                                                            <input type="tel" class="form-control" id="update-celphone${datos._id
              }" value="${datos.celphone
              }">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-email" class="form-label">Correo Electrónico</label>
                                        <input type="email" class="form-control" id="update-email${datos._id
              }" value="${datos.email}">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                

                                    <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="updateClient('${datos.id
              }' , '${datos._id
              }')">Actualizar Cliente</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </td> 
                    <td><i class="bi bi-x-circle" data-value='${datos._id
              }' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i></td>


                `;
            document.getElementById("table-body").appendChild(row);
          })
          .catch((error) => reject(error));
      });
    }
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
  };

  const addClient = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const celphone = document.getElementById("celphone").value;
    const email = document.getElementById("email").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

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
      user: user,
      password: password,
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
