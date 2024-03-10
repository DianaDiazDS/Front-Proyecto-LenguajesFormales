const apiUrl = "http://localhost:4000/transaction";
const authorizationToken = localStorage.getItem("login");
const iduser = localStorage.getItem("iduser");


fetch(apiUrl, {
  headers: {
    Authorization: `${authorizationToken}`,
  },
})
  .then((datos) => datos.json())
  .then((data) => { })
  .catch((error) => console.error(error));


/*formatDate(date):

Descripción: Este método formatea una fecha en el formato "yyyy/mm/dd" a partir de una cadena de fecha en formato de fecha de JavaScript.
Parámetros:
date (String): La cadena de fecha en formato de fecha de JavaScript.
Retorna:
String: La fecha formateada en el formato "yyyy/mm/dd".
Uso: Se utiliza para formatear las fechas en el formato deseado para su visualización en la interfaz de usuario. */

  const formatDate = (date) => {
    const fechaOriginal = new Date(date);
    const año = fechaOriginal.getUTCFullYear();
    const mes = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2); 
    const dia = ("0" + fechaOriginal.getUTCDate()).slice(-2);
    const horas = ("0" + fechaOriginal.getUTCHours()).slice(-2);
    const minutos = ("0" + fechaOriginal.getUTCMinutes()).slice(-2);

    const fechaFormateada = `${año}/${mes}/${dia}`;
    return fechaFormateada;
};

 /* loadTable():

  Descripción: Este método carga los datos de las transacciones en una tabla HTML y actualiza los campos de selección de categoría y estado. Además, muestra un modal para editar cada transacción.
  Parámetros: Ninguno.
  Retorna: Una promesa que se resuelve cuando se completan todas las operaciones de carga de datos y actualización de la tabla.
  Uso: Se llama al principio del script para cargar las transacciones.
 */
const loadTable = () => {
  document.getElementById("table-body").innerHTML = "";
  document.getElementById("select-id").innerHTML = "";
  const optionDefault = document.createElement("option");
  optionDefault.value = "Seleccione una categoria";
  optionDefault.innerText = "Seleccione una categoria";
  document.getElementById("select-id").appendChild(optionDefault);



  document.getElementById("select-id2").innerHTML = "";
const optionDefault2 = document.createElement("option");
optionDefault2.value = "Seleccione  estado";
optionDefault2.innerText = "Seleccione estado";
document.getElementById("select-id2").appendChild(optionDefault2);

  const clientId = localStorage.getItem("iduser");
  console.log("idusuario",clientId)
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
        const select2 = document.getElementById("select-id2");




        datos.data.forEach((transaccion) => {
         

          const paymentDate = formatDate(transaccion.paymentDate);
          const endDate = formatDate(transaccion.endDate);
          console.log("fecha",endDate)


          if (transaccion.client.id == clientId) {
          console.log("clienteeee", transaccion.client.id)

            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${paymentDate}</td>
          <td>${endDate}</td>
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
              }" value="${paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${endDate}">
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

            const option2 = document.createElement("option");
            option2.value = transaccion.status;
            option2.innerText = transaccion.status;
            select2.appendChild(option2);

            document.getElementById("table-body").appendChild(row);
          }
        });
      })
      .catch((erroaddr) => console.log(error));
  });
};


loadTable();

/*findByCategoria():

Descripción: Este método busca transacciones según la categoría seleccionada por el usuario y actualiza la tabla con los resultados.
Parámetros: Ninguno.
Retorna: Una promesa que se resuelve cuando se completan todas las operaciones de búsqueda y actualización de la tabla.
Uso: Se llama cuando el usuario selecciona una categoría en el formulario de filtro. */ 
const findByCategoria = () => {
  const option = document.getElementById("select-id");
  if (option.value !== "Seleccione una categoria") {


    const clientId = localStorage.getItem("iduser");
    if (!clientId) {
      console.error("No se encontró el ID del cliente en el localStorage");
      return;
    }


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


         

          result.data.forEach((transaccion) => {
            const paymentDate = formatDate(transaccion.paymentDate);
            const endDate = formatDate(transaccion.endDate);

            if (transaccion.client.id == clientId) {

            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${paymentDate}</td>
          <td>${endDate}</td>
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
              }" value="${paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${endDate}">
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
                        </div>6
                    </div>
            

                </td> 

                <td>
                <i class="bi bi-x-circle" data-value='${transaccion.id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
                </td>

                    
            `;




            document.getElementById("table-body").appendChild(row);

            }
          });
        })
        .catch((error) => reject(error));
    });
  }
};

/* findByStatus():

Descripción: Este método busca transacciones según el estado seleccionado por el usuario y actualiza la tabla con los resultados.
Parámetros: Ninguno.
Retorna: Una promesa que se resuelve cuando se completan todas las operaciones de búsqueda y actualización de la tabla.
Uso: Se llama cuando el usuario selecciona un estado en el formulario de filtro.*/ 
const findByStatus = () => {
  const option = document.getElementById("select-id2");
  if (option.value !== "Seleccione una estado") {


    const clientId = localStorage.getItem("iduser");
    if (!clientId) {
      console.error("No se encontró el ID del cliente en el localStorage");
      return;
    }
  console.log("aaaaaaaaaaaaa",clientId)

  // `http://localhost:4000/transaction/status/${option.value}/${clientId}`,
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:4000/transaction/status/${option.value}`,
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


  //         const clientId = localStorage.getItem("iduser");
  // if (!clientId) {
  //   console.error("No se encontró el ID del cliente en el localStorage");
  //   return;
  // }

          result.data.forEach((transaccion) => {

console.log("bbb",transaccion.client,clientId)
            if (transaccion.client.id == clientId) {
              console.log("ntrro", clientId)


            const paymentDate = formatDate(transaccion.paymentDate);
            const endDate = formatDate(transaccion.endDate);

            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${paymentDate}</td>
          <td>${endDate}</td>
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
              }" value="${paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${endDate}">
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
                        </div>6
                    </div>
            

                </td> 

                <td>
                <i class="bi bi-x-circle" data-value='${transaccion.id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
                </td>

                    
            `;




            document.getElementById("table-body").appendChild(row);

          }
          });
        })
        .catch((error) => reject(error));
    });
  }
};

/* findByAmount():

Descripción: Este método busca transacciones dentro de un rango de cantidades seleccionado por el usuario y actualiza la tabla con los resultados.
Parámetros: Ninguno.
Retorna: Una promesa que se resuelve cuando se completan todas las operaciones de búsqueda y actualización de la tabla.
Uso: Se llama cuando el usuario ingresa un rango de cantidades en el formulario de filtro.*/ 
const findByAmount = () => {
  const option1 = document.getElementById("amountfiltro1");
  const option2 = document.getElementById("amountfiltro2");
  const clientId = localStorage.getItem("iduser");

  if (!clientId) {
    console.error("No se encontró el ID del cliente en el localStorage");
    return;
  }


 console.log(option1.value,option2.value)

  validateFields2(option1.value,option2.value);
          const hasErrors = Object.values(errorMessages).some(
            
            (message) => message !== ""
          );
      
          if (hasErrors) {
            alert("hay errores")
            mostrarMensajeError();
            return;
          }

  
  if (option1.value !== "" && option2.value !== "") {
    return new Promise((resolve, reject) => {
      fetch(
        `http://localhost:4000/transaction/amount/${option1.value}/${option2.value}`,
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
            const paymentDate = formatDate(transaccion.paymentDate);
            const endDate = formatDate(transaccion.endDate);
            if (transaccion.client.id == clientId) {
            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${transaccion.id}</td>
          <td>${transaccion.amount}</td>
          <td>${transaccion.status}</td>
          <td>${transaccion.entityname}</td>
          <td>${paymentDate}</td>
          <td>${endDate}</td>
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
              }" value="${paymentDate}">
                                    </div>
                                    <div class="mb-3">
                                        <label for="update-endDate" class="form-label">fecha limite</label>
                                        <input type="text" class="form-control" id="update-endDate${transaccion._id
              }" value="${endDate}">
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
                        </div>6
                    </div>
            

                </td> 

                <td>
                <i class="bi bi-x-circle" data-value='${transaccion.id}' type="button" onclick='drop(this.getAttribute("data-value"))' style="color: red; font-size: 2rem;"></i>
                </td>

                    
            `;




            document.getElementById("table-body").appendChild(row);
            }
          });
        })
        .catch((error) => reject(error));
    });
  }
};


/*drop(id):

Descripción: Este método elimina una transacción según el ID proporcionado y actualiza la tabla después de la eliminación.
Parámetros: id (String) - El ID de la transacción que se va a eliminar.
Retorna: Ninguno.
Uso: Se llama cuando el usuario desea eliminar una transacción específica. */
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


/*limpiarCampos():

Descripción: Este método limpia todos los campos del formulario de ingreso de transacciones.
Parámetros: Ninguno.
Retorna: Ninguno.
Uso: Se llama cuando se necesita limpiar todos los campos del formulario. */
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

/*findByIdUsuario(clientId)

Descripción: Este método busca un cliente por su ID en el servidor.
Parámetros:
clientId (string): El ID del cliente que se desea buscar.
Retorna: No retorna ningún valor directamente. Actualiza la variable clientIdFound con el ID encontrado, si existe, en el servidor.
Excepciones:
Si no se encuentra ningún cliente con el ID especificado, se lanza un error con el mensaje "No se encontraron resultados para el ID especificado.". */
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
    clientIdFound = data[0]._id; 
  } else {
    throw new Error("No se encontraron resultados para el ID especificado.");
  }
};
/*getClientId()

Descripción: Este método retorna el ID del cliente encontrado mediante la función findByIdUsuario.
Parámetros: Ninguno.
Retorna:
clientIdFound (string): El ID del cliente encontrado. */
const getClientId = () => {
  return clientIdFound; 
};


/*convertirFecha(fecha)

Descripción: Este método convierte una fecha de formato dd/mm/yy o dd/mm/yyyy a formato yyyy/mm/dd.
Parámetros:
fecha (string): La fecha en formato dd/mm/yy o dd/mm/yyyy.
Retorna:
fechaFormateada (string): La fecha formateada en formato yyyy/mm/dd. */
function convertirFecha(fecha) {
  // Verificar si la fecha está en formato numérico (dd/mm/yyyy) o (dd/mm/yy)
  const partes = fecha.split("/");
  if (partes.length === 3) {
    const año = partes[2].length === 2 ? `20${partes[2]}` : partes[2]; // Si el año tiene 2 dígitos, se asume que está en el siglo XXI
    return `${año}/${partes[1]}/${partes[0]}`;
  }

  // Si la fecha está en formato abreviado (dd/abr/yyyy)
  const meses = {
    "ene": "01", "feb": "02", "mar": "03", "abr": "04", "may": "05", "jun": "06",
    "jul": "07", "ago": "08", "sep": "09", "oct": "10", "nov": "11", "dic": "12"
  };

  const dia = partes[0];
  const mesAbreviado = partes[1];
  const año = `20${partes[2]}`; 

  const mesNumerico = meses[mesAbreviado.toLowerCase()];
  const fechaFormateada = `${año}/${mesNumerico}/${dia}`;

  return fechaFormateada;
}

/*quitarComas(numeroConComas)

Descripción: Este método elimina las comas de un número.
Parámetros:
numeroConComas (string): El número con comas.
Retorna:
numeroSinComas (string): El número sin comas. */

function quitarComas(numeroConComas) {
  return numeroConComas.replace(/,/g, "");
}
/*addRellenarTransaction()

Descripción: Este método agrega una nueva transacción utilizando los datos ingresados en un formulario en la página web.
Parámetros: Ninguno.
Retorna: No retorna ningún valor.
Funcionamiento: Extrae los datos del formulario, realiza validaciones y luego envía una solicitud POST al servidor para agregar la transacción.
Excepciones: Alerta al usuario si ocurre algún error durante el proceso. */
const addRellenarTransaction = () => {
  
  const mensajeTexto = document.getElementById("mensajeTexto").value;

  const amountRegex = /(\$?\d{1,3}(?:[,.]\d{3})*(?:[,.]\d{1,2})?)/;
  const entitynameRegex = /(?:Pagaste|Tienes una factura pendiente de) \$.+? a (\w+)/;
  const paymentDateRegex = /(\d{2}\/\d{2}\/\d{4})/; // Formato: dd/mm/yyyy
  const statusRegex = /\sPagaste\b/;
  
  const amountMatch = mensajeTexto.match(amountRegex);
  const entitynameMatch = mensajeTexto.match(entitynameRegex);
  const paymentDateMatch = mensajeTexto.match(paymentDateRegex);
  const statusMatch = mensajeTexto.match(statusRegex);

  console.log("fecha1",paymentDateMatch[1])
  let amount = "";
  if (amountMatch) {
    
    amount = amountMatch[1].replace(/\$/g, '').replace(/,/g, '').replace(/\./g, '.');  }

  let entityname = "";
  if (entitynameMatch) {
    entityname = entitynameMatch[1] || entitynameMatch[2] || "";
    console.log("entityname", entityname);
  } else {
    console.log("No se encontraron coincidencias para entityname.");
  }

  let paymentDate = "";
  let endDate = "";

  if (paymentDateMatch) {
    if (statusMatch) {
      paymentDate = convertirFecha(paymentDateMatch[1])
    } else {
      endDate = convertirFecha(paymentDateMatch[1]);
    }
  }



  const status = statusMatch ? "pago" : "noPago";
  const idValue= document.getElementById("id").value;
  document.getElementById("id").value=idValue;
  document.getElementById("amount").value = amount;
  document.getElementById("entityname").value = entityname;
  document.getElementById("paymentDate").value = paymentDate;
  document.getElementById("endDate").value = endDate;
  document.getElementById("status").value = status;
  

  console.log("amount", amount);
  console.log("entityname", entityname);
  console.log("paymentDate", paymentDate);
  console.log("endDate", endDate);
  console.log("status", status);

  console.log("¡Transacción agregada con éxito!");
};


/*addTransaction()

Descripción: Este método agrega una nueva transacción utilizando los datos ingresados en un formulario en la página web.
Parámetros: Ninguno.
Retorna: No retorna ningún valor.
Funcionamiento: Extrae los datos del formulario, realiza validaciones y luego envía una solicitud POST al servidor para agregar la transacción.
Excepciones: Alerta al usuario si ocurre algún error durante el proceso. */

const addTransaction = () => {
  const id = document.getElementById("id").value;
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status").value;
  const entityname = document.getElementById("entityname").value;
  const paymentDate = document.getElementById("paymentDate").value;
  const endDate = document.getElementById("endDate").value;
  const category = document.getElementById("category").value;

  const clientId = localStorage.getItem("iduser");  

  findByIdUsuario(clientId)
    .then(() => {
      const clientnEncontrado = getClientId();

      validateFields(id,amount, status, entityname, paymentDate,endDate,category);
          const hasErrors = Object.values(errorMessages).some(
            
            (message) => message !== ""
          );
      
          if (hasErrors) {
            alert("hay errires")
            mostrarMensajeError();
            return;
          }


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
     
          if (!response.ok) {
            
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

/**validateField(fieldName, value)

Descripción: Este método valida un campo específico del formulario.
Parámetros:
fieldName (string): El nombre del campo a validar.
value (string): El valor del campo a validar.
Retorna: No retorna ningún valor.
Funcionamiento: Realiza validaciones específicas para diferentes campos del formulario y actualiza el objeto errorMessages con mensajes de error si es necesario. */

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

    case "cantidad":
      if (isNaN(value) || value <= 0 || value > 2000000) {
        errorMessages[fieldName] =
          "El campo Cantidad debe ser un número válido que no supere los 2 millones.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "cantidad2":
      if (isNaN(value) || value <= 0 || value > 2000000) {
        errorMessages[fieldName] =
          "El campo Cantidad debe ser un número válido que no supere los 2 millones.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "estado":
      const validStatus = ["pago", "deuda", "noPago"];
      if (!validStatus.includes(value)) {
        errorMessages[fieldName] =
          "El campo Estado debe ser 'pago', 'deuda' o 'noPago'.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "entidad":
      const entidadPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      if (!entidadPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Entidad debe contener solo letras y espacios.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "fechapago":
      const datepagoPattern = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
      if (!datepagoPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Fecha debe tener el formato dd/mm/yyyy.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "fechalimite":
      const datelimitePattern = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
      if (!datelimitePattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Fecha debe tener el formato dd/mm/yyyy.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "categoria":
      const categoriaPattern = /^[A-Za-z\s]+$/;
      if (!categoriaPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Categoría debe contener solo letras y espacios.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    default:
      break;
  }
};
/*validateFields(id, amount1, status1, entityname1, paymentDate1, endDate1, category1)

Descripción: Este método valida todos los campos del formulario de agregar transacción.
Parámetros:
id (string): El ID de la transacción.
amount1 (string): La cantidad de la transacción.
status1 (string): El estado de la transacción.
entityname1 (string): El nombre de la entidad de la transacción.
paymentDate1 (string): La fecha de pago de la transacción.
endDate1 (string): La fecha límite de la transacción.
category1 (string): La categoría de la transacción.
Retorna: No retorna ningún valor.
Funcionamiento: Utiliza el método validateField para validar cada campo individualmente y muestra un mensaje de error si es necesario. */

const validateFields = ( id, amount1, status1, entityname1, paymentDate1,endDate1,category1)=> {
  validateField("Id", id);
  validateField("cantidad", amount1);
  validateField("estado", status1);
  validateField("entidad", entityname1);
  if ( paymentDate1 !== "") {
        validateField("fechapago", paymentDate1);
      }
  
  validateField("fechalimite", endDate1);
  validateField("categoria", category1);

  mostrarMensajeError();
};

const validateFields2 = ( amount1, amount2)=> {
 
  validateField("cantidad", amount1);
  validateField("cantidad2", amount2);

  
};


/*mostrarMensajeError()

Descripción: Este método muestra un mensaje de error si hay errores de validación en el formulario.
Parámetros: Ninguno.
Retorna: No retorna ningún valor.
Funcionamiento: Utiliza el objeto errorMessages para generar un mensaje de error y mostrarlo utilizando la librería SweetAlert. */
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

/*updateTransaction(transaccionId1, transaccionId)

Descripción: Este método actualiza una transacción existente en el servidor.
Parámetros:
transaccionId1 (string): El ID de la transacción que se desea actualizar.
transaccionId (string): El ID de la transacción que se muestra en la interfaz de usuario.
Retorna: No retorna ningún valor.
Funcionamiento: Obtiene los datos actualizados de la transacción desde el formulario, los valida, y luego envía una solicitud PATCH al servidor para actualizar la transacción.
Excepciones: Alerta al usuario si ocurre algún error durante el proceso. */
const updateTransaction = (transaccionId1, transaccionId) => {

  const updatedAmount = document.getElementById("update-amount" + transaccionId).value;
  const updatedStatus = document.getElementById("update-status" + transaccionId).value;
  const updatedEntityname = document.getElementById("update-entityname" + transaccionId).value;
  const updatedPaymentDate = document.getElementById("update-paymentDate" + transaccionId).value;
  const updatedEndDate = document.getElementById("update-endDate" + transaccionId).value;
  const updatedCategory = document.getElementById("update-category" + transaccionId).value;

 

  validateFields(transaccionId1,updatedAmount, updatedStatus, updatedEntityname,updatedPaymentDate,updatedEndDate,updatedCategory);
          const hasErrors = Object.values(errorMessages).some(
            (message) => message !== ""
          );
      
          if (hasErrors) {
            mostrarMensajeError();
            return;
          }

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
