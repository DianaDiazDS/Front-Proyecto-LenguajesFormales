const apiUrl = "http://localhost:4000/transaction";
// const authorizationToken = localStorage.getItem("login");
const authorizationToken = localStorage.getItem("login");

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

const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  const optionDefault = document.createElement("option");
  optionDefault.value = "Seleccione una categoria";
  optionDefault.innerText = "Seleccione una categoria";
  document.getElementById("select-id").appendChild(optionDefault);

  const clientId = localStorage.getItem("iduser");
  if (!clientId) {
    console.error("No se encontró el ID del cliente en el localStorage");
    return;
  }


  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      headers: {
        Authorization: `${authorizationToken}`,
      },
    })
      .then((datos) => datos.json())
      .then((datos) => {
        const select = document.getElementById("select-id");



        datos.data.forEach((transaccion) => {
          // console.log("clienteeee",transaccion.client)
          console.log("clienteeee", transaccion.client.id)
          // <td>${transaccion.client.name}</td>

          if (transaccion.client.id == clientId) {
            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${transaccion.paymentDate}</td>
          <td>${transaccion.endDate}</td>
          <td>${transaccion.category}</td>
                <td>      
                
                    <i class="bi bi-pencil-fill"
                    type="button" 
                    data-bs-toggle="modal"
                    data-bs-target="#editModal${transaccion._id}" 
                    style="color: #FFC300; font-size: 2rem;">
                    </i>
                    <!-- Modal -->
                    <div class="modal fade" id="editModal${transaccion._id
              }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editModalLabel">Editar transaccion</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">            
                
                                    <div class="mb-3">
                                        <label for="update-amount" class="form-label">cantidad</label>
                                        <input type="text" class="form-control" id="update-amount${transaccion._id
              }" value="${transaccion.amount}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-status" class="form-label">estado</label>
                                        <input type="tel" class="form-control" id="update-status${transaccion._id
              }" value="${transaccion.status}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-entityname" class="form-label">entityname</label>
                                        <input type="tel" class="form-control" id="update-entityname${transaccion._id
              }" value="${transaccion.entityname}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-paymentDate" class="form-label">fecha pago</label>
                                        <input type="text" class="form-control" id="update-paymentDate${transaccion._id
              }" value="${transaccion.paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${transaccion.endDate}">
                                    </div>
                                    <div class="mb-3">
                                    <label for="update-category" class="form-label">categoria</label>
                                    <input type="text" class="form-control" id="update-category${transaccion._id
              }" value="${transaccion.category}">
                                     </div>
                                    
                                    
                                </div>


                                <div class="modal-footer">                     
                                    <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="updateTransaction('${transaccion.id}','${transaccion._id}' )">Actualizar transaccion</button>
                                </div>
                            </div>
                        </div>
                    </div>
            

                </td> 

                <td>
                <i class="bi bi-x-circle" data-value='${transaccion.id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
                </td>

                    
            `;

            const option = document.createElement("option");
            option.value = transaccion.category;
            option.innerText = transaccion.category;
            select.appendChild(option);

            document.getElementById("table-body").appendChild(row);
          }
        });
      })
      .catch((erroaddr) => console.log(error));
  });
};
const chargeSelect = () => {
  console.log("entro a buscar")
  const URIC = "http://localhost:4000/client";

  fetch(URIC
  )
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById("select-id2");
      data.data.forEach((element) => {

        const option = document.createElement("option");
        option.value = element.id;
        option.innerText = element.id;
        select.appendChild(option);



      });
    });
};

loadTable();
chargeSelect();


const findById = () => {
  const option = document.getElementById("select-id");
  if (option.value !== "Seleccione una categoria") {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:4000/transaction/categoria/${option.value}`,
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
          document.getElementById("table-body").innerHTML = "";


          const clientId = localStorage.getItem("iduser");
          if (!clientId) {
            console.error("No se encontró el ID del cliente en el localStorage");
            return;
          }

          result.data.forEach((transaccion) => {
            
            const row = document.createElement("tr");
            // <td>${transaccion.client.name}</td>
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${transaccion.paymentDate}</td>
          <td>${transaccion.endDate}</td>
          <td>${transaccion.category}</td>
        
                <td>      
                
                    <i class="bi bi-pencil-fill"
                    type="button" 
                    data-bs-toggle="modal"
                    data-bs-target="#editModal${transaccion._id}" 
                    style="color: #FFC300; font-size: 2rem;">
                    </i>
                    <!-- Modal -->
                    <div class="modal fade" id="editModal${transaccion._id
              }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="editModalLabel">Editar transaccion</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">            
                
                                    <div class="mb-3">
                                        <label for="update-amount" class="form-label">cantidad</label>
                                        <input type="text" class="form-control" id="update-amount${transaccion._id
              }" value="${transaccion.amount}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-status" class="form-label">estado</label>
                                        <input type="tel" class="form-control" id="update-status${transaccion._id
              }" value="${transaccion.status}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-entityname" class="form-label">entityname</label>
                                        <input type="tel" class="form-control" id="update-entityname${transaccion._id
              }" value="${transaccion.entityname}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-paymentDate" class="form-label">fecha pago</label>
                                        <input type="text" class="form-control" id="update-paymentDate${transaccion._id
              }" value="${transaccion.paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${transaccion.endDate}">
                                    </div>
                                    <div class="mb-3">
                                    <label for="update-category" class="form-label">categoria</label>
                                    <input type="text" class="form-control" id="update-category${transaccion._id
              }" value="${transaccion.category}">
                                     </div>
                                    
                                    
                                    
                                </div>


                                <div class="modal-footer">                     
                                    <button type="button" class="btn btn-secondary" onclick="loadTable()" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" onclick="updateTransaction('${transaccion.id}','${transaccion._id}' )">Actualizar transaccion</button>
                                </div>
                            </div>
                        </div>
                    </div>
            

                </td> 

                <td>
                <i class="bi bi-x-circle" data-value='${transaccion.id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
                </td>

                    
            `;




            document.getElementById("table-body").appendChild(row);
          });
        })
        .catch((error) => reject(error));
    });
  }
};

const drop = (id) => {
  const URI = `http://localhost:4000/transaction/${id}`;
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
          text: `El transaccion fue eliminado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al eliminar el transaccion",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar el transaccion");
    });
};

const limpiarCampos = () => {
  document.getElementById("id").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("status").value = "";
  document.getElementById("entityname").value = "";
  document.getElementById("paymentDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("category").value = "";
  document.getElementById("email").value = "";
};



let clientIdFound = null;

const findByIdUsuario = async (clientId) => {
  const response = await fetch(
    `http://localhost:4000/client/${clientId}`,
    {
      headers: {
        Authorization: `${authorizationToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const result = await response.json();
  const data = result.data;

  if (data.length > 0) {
    clientIdFound = data[0]._id; // Almacena el _id encontrado en la variable local
  } else {
    throw new Error("No se encontraron resultados para el ID especificado.");
  }
};

const getClientId = () => {
  return clientIdFound; // Devuelve el _id encontrado o null si no se encontró
};


const addTransaction = () => {
  const id = document.getElementById("id").value;
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status").value;
  const entityname = document.getElementById("entityname").value;
  const paymentDate = document.getElementById("paymentDate").value;
  const endDate = document.getElementById("endDate").value;
  const category = document.getElementById("category").value;


  const clientId = document.getElementById("select-id2").value;
  findByIdUsuario(clientId)
    .then(() => {
      const clientnEncontrado = getClientId();

      const newTransaction = {
        id: id,
        amount: amount,
        status: status,
        entityname: entityname,
        paymentDate: paymentDate,
        endDate: endDate,
        category: category,
        client: {
          _id: clientnEncontrado,
        },
      };

    })
    .catch((error) => {
      console.error("Error al buscar cliente:", error);
    });

  findByIdUsuario(clientId)
    .then(() => {
      const clientnEncontrado = getClientId();

      const newTransaction = {
        id: id,
        amount: amount,
        status: status,
        entityname: entityname,
        paymentDate: paymentDate,
        endDate: endDate,
        category: category,
        client: {
          _id: clientnEncontrado,
        },
      };

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authorizationToken}`,
        },
        body: JSON.stringify(newTransaction),
      })
        .then((response) => {
          console.log("b  bb", response.status)

          if (!response.ok) {
            console.log("a   a", response.status)
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((result) => {
          if (result.state) {
            loadTable();
            Swal.fire({
              title: "Registro exitoso",
              text: `El transaccion ${category} ha sido registrado.`,
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          } else {
            Swal.fire({
              title: "Error al registrar el transaccion",
              text: "Hubo un error al tratar de registrar en la base de datos.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Ocurrió un error al agregar el transaccion.");
        });
    })
    .catch((error) => {
      console.error("Error al buscar cliente:", error);
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

const updateTransaction = (transaccionId1, transaccionId) => {
  // transaccionId1,
  const updatedAmount = document.getElementById("update-amount" + transaccionId).value;
  const updatedStatus = document.getElementById("update-status" + transaccionId).value;
  const updatedEntityname = document.getElementById("update-entityname" + transaccionId).value;
  const updatedPaymentDate = document.getElementById("update-paymentDate" + transaccionId).value;
  const updatedEndDate = document.getElementById("update-endDate" + transaccionId).value;
  const updatedCategory = document.getElementById("update-category" + transaccionId).value;

  const updateData = {
    amount: updatedAmount,
    status: updatedStatus,
    entityname: updatedEntityname,
    paymentDate: updatedPaymentDate,
    endDate: updatedEndDate,
    category: updatedCategory
  };

  console.log("update.........", updateData)
  fetch(
    `http://localhost:4000/transaction/${transaccionId1}`,
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
          text: `El transaccion ha sido actualizado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al actualizar el transaccion",
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
