const token = localStorage.getItem("login");

//  

const loadTable = () => {
  const URI = "http://localhost:4000/reservation/";

  fetch(URI, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tBody");
      tbody.innerHTML = "";
      document.getElementById("select-reservation").innerHTML = "";
      const optionDefault = document.createElement("option");
      optionDefault.value = "Seleccione un ID";
      optionDefault.innerText = "Seleccione un ID";
      document.getElementById("select-reservation").appendChild(optionDefault);
      const select = document.getElementById("select-reservation");
      data.data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.id;
        select.appendChild(option);

        const row = document.createElement("tr");
        const dateStart = dateFormat(element.bookingStartDate);
        const dateEnd = dateFormat(element.bookingEndDate);

        row.innerHTML = `
        <th scope="row style="color: red;">${element.id}</th>
        <td>${element.bookingStartDate}</td>
        <td>${element.bookingEndDate}</td>
        <td>${element.service}</td>
        <td>${element.client.name}</td>
        <td>${element.comments}</td>
        <td><!-- Button trigger modal -->

        <i class="bi bi-pencil-fill"
              type="button" 
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop${element._id}" 
              style="color: #FFC300; font-size: 2rem;">
        </i>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${
          element._id
        }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar reservación</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="loadTable()"></button>
              </div>
              <div class="modal-body">

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input disabled type="number" id="idEdit${
                      element.id
                    }" class="form-control" value=${
          element.id
        } placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Servicio</span>
                    <input type="text" class="form-control" id="serviceEdit${
                      element.id
                    }" value=${
          element.service
        } placeholder="service" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Inicio de la reservación</span>
                    <input type="datetime-local" id="dateStartEdit${
                      element.id
                    }" class="form-control" value=${dateStart} placeholder="bookingStartDate" aria-label="bookingStartDate" aria-describedby="basic-addon1" min="${new Date()
          .toISOString()
          .slice(0, 16)}">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Finalizacion de la reservación</span>
                    <input type="datetime-local" id="dateEndEdit${
                      element.id
                    }" class="form-control" value=${dateEnd} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1" min="${new Date()
          .toISOString()
          .slice(0, 16)}">
                    </div>


                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Cliente</span>
                    <input disabled type="text" id="clientEdit${
                      element.id
                    }" class="form-control" value=${
          element.client.name
        } placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Comentarios</span>
                    <input type="text" id="commentsEdit${
                      element.id
                    }" class="form-control" value=${
          element.comments
        } placeholder="comments" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="loadTable()">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick='updateElement(this.getAttribute("data-value"))' data-value="${
                  element.id
                }">Editar Reservacion</button>
              </div>
            </div>
          </div>
        </div></td>
        <td><i class="bi bi-x-circle" data-value="${
          element.id
        }" type="button" onClick='deleteElement(this.getAttribute("data-value"))' style="color: red; font-size: 2rem; border: none;"></i></td>

        `;
        tbody.appendChild(row);
      });
    });
};

const actualizarTabla = (datos) => {
  const map = [datos[0]];
  const tbody = document.getElementById("tBody");
  tbody.innerHTML = "";
  map.forEach((element) => {
    const row = document.createElement("tr");
    const dateStart = dateFormat(element.bookingStartDate);
    const dateEnd = dateFormat(element.bookingEndDate);
    row.innerHTML = `
        <th scope="row style="color: red;">${element.id}</th>
        <td>${element.bookingStartDate}</td>
        <td>${element.bookingEndDate}</td>
        <td>${element.service}</td>
        <td>${element.client.name}</td>
        <td>${element.comments}</td>
        <td><!-- Button trigger modal -->

        <i class="bi bi-pencil-fill"
              type="button" 
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop${element._id}" 
              style="color: #FFC300; font-size: 2rem;">
        </i>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop${
          element._id
        }" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="loadTable()"></button>
              </div>
              <div class="modal-body">

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ID</span>
                    <input disabled type="number" id="idEdit${
                      element.id
                    }" class="form-control" value=${
      element.id
    } placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Servicio</span>
                    <input type="text" class="form-control" id="serviceEdit${
                      element.id
                    }" value=${
      element.service
    } placeholder="service" aria-label="Username" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Inicio de la reservación</span>
                    <input type="datetime-local" id="dateStartEdit${
                      element.id
                    }" class="form-control" value=${dateStart} placeholder="bookingStartDate" aria-label="bookingStartDate" aria-describedby="basic-addon1" min="${new Date()
      .toISOString()
      .slice(0, 16)}">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Finalización de la reservación</span>
                    <input type="datetime-local" id="dateEndEdit${
                      element.id
                    }" class="form-control" value=${dateEnd} placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1" min="${new Date()
      .toISOString()
      .slice(0, 16)}">
                    </div>


                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Cliente</span>
                    <input disabled type="text" id="clientEdit${
                      element.id
                    }" class="form-control" value=${
      element.client.name
    } placeholder="bookingEndDate" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Comentarios</span>
                    <input type="text" id="commentsEdit${
                      element.id
                    }" class="form-control" value=${
      element.comments
    } placeholder="comments" aria-label="bookingStartDate" aria-describedby="basic-addon1">
                    </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick="loadTable()">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick='updateElement(this.getAttribute("data-value"))' data-value="${
                  element.id
                }">Editar Reservacion</button>
              </div>
            </div>
          </div>
        </div></td>
        <td><i class="bi bi-x-circle" data-value="${
          element.id
        }" type="button" onClick='deleteElement(this.getAttribute("data-value"))' style="color: red; font-size: 2rem; border: none;"></i></td>

        `;
    document.getElementById("tBody").appendChild(row);
  });
};

document.getElementById("select-reservation").addEventListener("change", () => {
  const valor = document.getElementById("select-reservation").value;
  const URI = `http://localhost:4000/reservation/${valor}`;
  fetch(URI, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((r) => {
      actualizarTabla(r.data);
    })
    .catch((err) => console.error(err));
});

document
  .getElementById("btn-reload-reservation")
  .addEventListener("click", () => {
    loadTable();
  });

const dateFormat = (date) => {
  var fechaOriginal = new Date(date);

  var año = fechaOriginal.getUTCFullYear();
  var mes = ("0" + (fechaOriginal.getUTCMonth() + 1)).slice(-2); // Sumar 1 porque los meses van de 0 a 11
  var dia = ("0" + fechaOriginal.getUTCDate()).slice(-2);
  var horas = ("0" + fechaOriginal.getUTCHours()).slice(-2);
  var minutos = ("0" + fechaOriginal.getUTCMinutes()).slice(-2);

  // Formatear la fecha como "yyyy-MM-ddThh:mm"
  var fechaFormateadaStart =
    año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos;
  return fechaFormateadaStart;
};

const chargeSelect = () => {
  const URIC = "http://localhost:4000/client";

  fetch(URIC, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((element) => {
        const select = document.createElement("option");
        select.value = element._id;
        select.textContent = element.name;

        document.getElementById("clientnSend").appendChild(select);
      });
    });
};

document.getElementById("Agregar").addEventListener("click", () => {
  const id = document.getElementById("idSend").value;
  const service = document.getElementById("nameSend").value;
  const bookingStar = document.getElementById("bookingStar").value;
  const bookingEnd = document.getElementById("bookingEnd").value;
  const clientnSend = document.getElementById("clientnSend").value;
  const comments = document.getElementById("commentsSend").value;

  validateFields(id, service, bookingStar, bookingEnd, clientnSend);
  const hasErrors = Object.values(errorMessages).some(
    (message) => message !== ""
  );

  if (hasErrors) {
    mostrarMensajeError();
    return;
  }
  const dataSend = {
    id: id,
    bookingStartDate: bookingStar,
    bookingEndDate: bookingEnd,
    service: service,
    comments: comments,
    client: {
      _id: clientnSend,
    },
  };

  //falta validar para que no deje campos vacios
  const URI = "http://localhost:4000/reservation/";
  fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(dataSend),
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.state) {
        Swal.fire({
          title: "Insercion exitosa",
          text: `La reservación ha sido agregado.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        cleanFields();
        loadTable();
      } else {
        Swal.fire({
          title: "Error al agregar la reservación",
          text: "Hubo un error al tratar de agregar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((err) => console.log(err + " verificar que el id no este repetido"));
});

chargeSelect();
loadTable();

const updateElement = (id) => {
  const service = document.getElementById("serviceEdit" + id).value;
  const dateStart = document.getElementById("dateStartEdit" + id).value;
  const dateEnd = document.getElementById("dateEndEdit" + id).value;
  const client = document.getElementById("clientEdit" + id).value;
  const comments = document.getElementById("commentsEdit" + id).value;

  validateFields2(service, dateStart, dateEnd);
  const hasErrors = Object.values(errorMessages).some(
    (message) => message !== ""
  );

  if (hasErrors) {
    mostrarMensajeError();
    return;
  }

  const updateData = {
    bookingStartDate: dateStart,
    bookingEndDate: dateEnd,
    service: service,
    cliente: client,
    comments: comments,
  };

  const URI = `http://localhost:4000/reservation/${id}`;
  fetch(URI, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        Swal.fire({
          title: "Actualizacion exitosa",
          text: `La reservación ha sido actualizada.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al editar la reservación",
          text: "Hubo un error al tratar de editar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => alert(error));
};

const deleteElement = (id) => {
  const URI = `http://localhost:4000/reservation/${id}`;
  fetch(URI, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        loadTable();
        Swal.fire({
          title: "Eliminación exitosa",
          text: `La reservación ha sido eliminada.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error al eliminar el la reservación",
          text: "Hubo un error al tratar de eliminar en la base de datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        title: "Error al eliminar el la reservación",
        text: "Hubo un error al tratar de eliminar en la base de datos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
};

const validateFields = (id, service, bookingStar, bookingEnd, clientnSend) => {
  validateField("id", id);
  validateField("service", service);
  //validateField("dateStart", bookingStar);
  //validateField("dateEnd", bookingEnd);
  validateField("client", clientnSend);
  mostrarMensajeError();
};

const cleanFields = () => {
  document.getElementById("idSend").value = "";
  document.getElementById("nameSend").value = "";
  document.getElementById("bookingStar").value = "";
  document.getElementById("bookingEnd").value = "";
  document.getElementById("commentsSend").value = "";

  // Restablecer el valor seleccionado en el elemento select
  var selectElement = document.getElementById("clientnSend");
  selectElement.selectedIndex = 0; // Establece la opción predeterminada como seleccionada
};
let errorMessages = {};

const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "service":
      const nombrePattern = /^[a-zA-Z ]{3,}$/;
      if (!nombrePattern.test(value)) {
        errorMessages[fieldName] =
          "El campo Nombre debe contener solo letras y tener al menos 3 caracteres.";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "dateStart":
      const dateStartPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      if (!dateStartPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo de fecha debe estar en formato data-time";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "dateEnd":
      const dateEndPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      if (!dateEndPattern.test(value)) {
        errorMessages[fieldName] =
          "El campo de fecha debe estar en formato data-time";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "id":
      const idPatterna = /^[0-9]+$/;
      if (!idPatterna.test(value)) {
        errorMessages[fieldName] = "El id dee ser numerico";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "id":
      const idPattern = /^[0-9]+$/;
      if (!idPattern.test(value)) {
        errorMessages[fieldName] = "El id dee ser numerico";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    case "client":
      if (value == null || value == undefined || value == "Cliente") {
        errorMessages[fieldName] = "El id dee ser numerico";
      } else {
        errorMessages[fieldName] = "";
      }
      break;
    default:
      break;
  }
};
const validateFields2 = (service, dateStart, dateEnd) => {
  validateField("service", service);
  //validateField("dateStart", dateStart);
  //validateField("dateEnd", dateEnd);

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
      title: "Campos inválidos",
      text: errorMessageText,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const minDate = () => {
  // Obtener el elemento de entrada
  var inputFechaStart = document.getElementById("bookingStar");
  var inputFechaEnd = document.getElementById("bookingEnd");
  // Obtener la fecha actual en el formato de entrada
  var fechaActual = new Date().toISOString().slice(0, 16);

  // Establecer el atributo 'min' en el elemento de entrada
  inputFechaStart.min = fechaActual;
  inputFechaEnd.min = fechaActual;
};

minDate();

const logOut = () => {
  localStorage.removeItem("login");
};
