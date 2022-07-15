"use strict";

import express, { json } from "express";
import cors from "cors";
import { dbConect } from "../config/database";
import { json as _json } from "body-parser";
import morgan from 'morgan'
import morganbody from 'morgan-body'
import path from 'path';
import fs from 'fs';
const app = express();


app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Escuchando puerto", app.get("port"));
  dbConect();
});


app.use(json());
app.use(_json());
app.use(cors());

const logs = fs.createWriteStream(
  path.join(__dirname, "../logs", "apilogs.log")
);
morganbody(app, {
  noColors: true,
  stream: logs
})


app.use(morgan('dev',{
  skip: function (req, res) { return res.statusCode < 400 }
}));



//directorio publico
app.use(express.static(path.join(__dirname, "public")));

//archivos de rutas
app.use("/api/seaslp/index", require("../routes/index.routes").default);
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
