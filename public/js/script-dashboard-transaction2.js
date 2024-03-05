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




 
  const formatDate = (date) => {
    const fechaOriginal = new Date(date);
    const año = fechaOriginal.getUTCFullYear();
    const mes = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2); 
    const dia = ("0" + fechaOriginal.getUTCDate()).slice(-2);
    const horas = ("0" + fechaOriginal.getUTCHours()).slice(-2);
    const minutos = ("0" + fechaOriginal.getUTCMinutes()).slice(-2);

    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada;
};


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


const findByCategoria = () => {
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
          });
        })
        .catch((error) => reject(error));
    });
  }
};

const findByStatus = () => {
  const option = document.getElementById("select-id2");
  if (option.value !== "Seleccione una estado") {
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


          const clientId = localStorage.getItem("iduser");
          if (!clientId) {
            console.error("No se encontró el ID del cliente en el localStorage");
            return;
          }

          result.data.forEach((transaccion) => {
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
          });
        })
        .catch((error) => reject(error));
    });
  }
};

const findByAmount = () => {
  const option1 = document.getElementById("amountfiltro1");
  const option2 = document.getElementById("amountfiltro2");

  
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
    clientIdFound = data[0]._id; 
  } else {
    throw new Error("No se encontraron resultados para el ID especificado.");
  }
};

const getClientId = () => {
  return clientIdFound; 
};


function convertirFecha(fecha) {
  
  const meses = {
    "ene": "01", "feb": "02", "mar": "03", "abr": "04", "may": "05", "jun": "06",
    "jul": "07", "ago": "08", "sep": "09", "oct": "10", "nov": "11", "dic": "12"
  };
  const partes = fecha.split("/");
  
  const dia = partes[0];
  const mesAbreviado = partes[1];
  const año = partes[2];

  const mesNumerico = meses[mesAbreviado.toLowerCase()];
  const fechaFormateada = `${dia}/${mesNumerico}/${año}`;

  return fechaFormateada;
}
function quitarComas(numeroConComas) {
  return numeroConComas.replace(/,/g, "");
}
const addRellenarTransaction=()=>{
  const mensajeTexto = document.getElementById("mensajeTexto").value;

    
    // const amountRegex = /Valor:\s*([\d.,]+)/i;
    // const entitynameRegex = /factura\s+(\w+)\s+postpago/i;
    // const paymentDateRegex = /(\d{2}\/\d{2}\/\d{4})/; // Formato: dd/mm/yyyy
    // const endDateRegex = /Fecha\s+limite\s+de\s+pago:\s+(\d{2}\/\w+\/\d{4})/i; 
    // const categoryRegex = /(\w+)\s+postpago\s+del\s+mes\s+de/i;
    // const statusRegex = /gracias\s+por\s+tu\s+pago/i;
        
    const amountRegex = /(\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/;
    const paymentDateRegex = /(\d{2}\/(?:\d{2}|[a-zA-Z]{3})\/\d{4})/;
    // const entitynameRegex = /factura\s+(\w+)\s+postpago/i;
    // const paymentDateRegex = /(\d{2}\/\d{2}\/\d{4})/; // Formato: dd/mm/yyyy
    // const endDateRegex = /Fecha\s+limite\s+de\s+pago:\s+(\d{2}\/\d+\/\d{4})/i; 
    // const categoryRegex = /(\w+)\s+postpago\s+del\s+mes\s+de/i;
    // const statusRegex = /gracias\s+por\s+tu\s+pago/i;
   
    console.log(amountRegex)

    const amountMatch = mensajeTexto.match(amountRegex);
    // const entitynameMatch = mensajeTexto.match(entitynameRegex);
    const paymentDateMatch = mensajeTexto.match(paymentDateRegex);
    // const endDateMatch = mensajeTexto.match(endDateRegex);
    // const categoryMatch = mensajeTexto.match(categoryRegex);
    // const statusMatch = mensajeTexto.match(statusRegex);


    // _para modificar la fehcha
    // console.log("fecha",endDateMatch[1])
    // const fechaFormateada = convertirFecha(endDateMatch[1]);
    console.log("fecha",paymentDateMatch[1])
    const fechaFormateada = convertirFecha(paymentDateMatch[1]);

    // const numeroConComas =amountMatch[1];
    // const numeroSinComas = quitarComas(numeroConComas);

console.log("fechaaaa",fechaFormateada)

    // if (!amountMatch || !entitynameMatch || !paymentDateMatch || !endDateMatch || !categoryMatch) {
    //     console.log("No se pudo extraer la información completa de la transacción.");
        
    //      }  

    const amount = amountMatch ? amountMatch[1] : "";

    // const amount = numeroSinComas ? numeroSinComas : "";
    // const entityname = entitynameMatch ? entitynameMatch[1] : "";
    // const paymentDate = paymentDateMatch ? paymentDateMatch[1] : "";
    const endDate = fechaFormateada ? fechaFormateada : "";
    // const category = categoryMatch ? categoryMatch[1] : "";
    // const status = statusMatch ? "pago" : "noPago";


    document.getElementById("amount").value = amount;
    // document.getElementById("entityname").value = entityname;
    // document.getElementById("paymentDate").value = paymentDate;
    // document.getElementById("endDate").value = endDate;
    // document.getElementById("category").value = category;
    // document.getElementById("status").value = status;

    console.log("amount",amount);
    // console.log("entityname",entityname);
    // console.log("paymentDate",paymentDate);
    // console.log("endDate",endDate);
    // console.log("category",category);
    // console.log(" status", status);

    



    console.log("¡Transacción agregada con éxito!");
}

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
      const datepagoPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!datepagoPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Fecha debe tener el formato dd/mm/yyyy.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;

    case "fechalimite":
      const datelimitePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
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
