"use strict";

import express, { json } from "express";
const app = express();
var path = require("path");
import cors from "cors";
import { dbConect } from "../config/database";
import { json as _json } from "body-parser";

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("Escuchando puerto", app.get("port"));
  dbConect();
});
app.use(json());
app.use(_json());
app.use(cors());

//directorio publico
app.use(express.static(path.join(__dirname, "public")));

//archivos de rutas
app.use("/api/index", require("../routes/index.routes").default);
app.use("/api/seaslp/users", require("../routes/usuarios.routes"));
app.use("/api/seaslp/login", require("../routes/login.routes"));
app.use("/api/seaslp/tenders", require("../routes/tenders.routes"));
app.use("/api/seaslp/contracts", require("../routes/contracts.routes"));
app.use("/api/seaslp/parties", require("../routes/parties.routes"));
app.use("/api/seaslp/buyers", require("../routes/buyers.routes"));
app.use("/api/seaslp/relases", require("../routes/releases.routes"));
app.use("/api/seaslp/awards", require("../routes/awards.routes"));
app.use("/api/seaslp/items", require("../routes/items.routes"));
app.use("/api/v1", require('../routes/api.routes'));

// app.use('/api/upload', require('../routes/uploadsFiles.routes'));
export default app;
