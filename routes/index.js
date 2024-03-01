const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/index.html"))
);

router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/login.html"))
);

router.get("/dashboard-home", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/dashboard-home.html"))
);

router.get("/dashboard-clientes", (req, res) =>
res.sendFile(path.join(__dirname + "../../views/dashboard-client.html"))
);

router.get("/dashboard-transactions", (req, res) =>
  res.sendFile(path.join(__dirname + "../../views/dashboard-transaction2.html"))
);

// router.get("/dashboard-registro", (req, res) =>
//   res.sendFile(path.join(__dirname + "../../views/dashboard-registro.html"))
// );

module.exports = router;
