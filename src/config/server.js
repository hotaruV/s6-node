const express = require("express");
const app = express();
const cors = require("cors");
const { dbConect } = require("../config/database");
var bodyParser = require('body-parser')

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Escuchando puerto", app.get("port"));
  dbConect();
});
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

//directorio publico
app.use(express.static("./src/public"));

//archivos de rutas
app.use("/api/index", require("../routes/index.routes"));
app.use("/api/seaslp/users", require("../routes/usuarios.routes"));
app.use("/api/seaslp/login", require("../routes/login.routes"));
app.use("/api/seaslp/tenders", require("../routes/tenders.routes"));
app.use("/api/seaslp/contracts", require("../routes/contracts.routes"));
app.use("/api/seaslp/parties", require("../routes/parties.routes"));
app.use("/api/seaslp/buyers", require("../routes/buyers.routes"));
app.use("/api/seaslp/relases", require("../routes/releases.routes"));

// app.use('/api/upload', require('../routes/uploadsFiles.routes'));
module.exports = app;
