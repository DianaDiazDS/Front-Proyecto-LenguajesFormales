import Axios from "axios";
import { drop, findByIdUsuario, addTransaction, updateTransaction } from "./tusMetodos.js";

// Prueba para el método drop
test("Eliminar transacción", async () => {
  const idTransaccion = 123; // Suponiendo que este es el ID de la transacción a eliminar
  const mockResponse = { state: true }; // Simular respuesta exitosa
  
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true
    })
  );

  const resultado = await drop(idTransaccion);

  expect(resultado).toEqual(mockResponse);
});

// Prueba para el método findByIdUsuario
test("Buscar cliente por ID", async () => {
  const clientId = 83; // Suponiendo que este es el ID del cliente
  const mockResponse = { data: [{ _id: "mockClientID" }] }; // Simular respuesta exitosa

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true
    })
  );

  const resultado = await findByIdUsuario(clientId);

  expect(resultado).toEqual("mockClientID");
});

// Prueba para el método addTransaction
test("Agregar transacción", async () => {
  // Mock de los valores de entrada
  const mockValues = {
    id: "mockID",
    amount: 100,
    status: "mockStatus",
    entityname: "mockEntityName",
    paymentDate: "2024/02/02",
    endDate: "2024/02/02",
    category: "mockCategory"
  };

  const mockResponse = { state: true }; // Simular respuesta exitosa
  
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true
    })
  );

  const resultado = await addTransaction();

  expect(resultado).toEqual(mockResponse);
});

// Prueba para el método updateTransaction
test("Actualizar transacción", async () => {
  // Mock de los valores de entrada
  const mockValues = {
    id: "mockID",
    amount: 100,
    status: "mockStatus",
    entityname: "mockEntityName",
    paymentDate: "2024/02/02",
    endDate: "2024/02/02",
    category: "mockCategory"
  };

  const mockResponse = { state: true }; // Simular respuesta exitosa
  
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true
    })
  );

  const resultado = await updateTransaction("transaccionId1", "transaccionId");

  expect(resultado).toEqual(mockResponse);
});
