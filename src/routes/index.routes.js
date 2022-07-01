const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const route = Router();

route.get("/", (req, res) => {
  // console.log(process.env)
  res.json({
    version: 1.0,
  });
});

route.get("/list-slp", (req, res) => {
  const ruta = path.resolve(__dirname, "../documents/municipios.json");
  console.log(ruta);
  const fileContents = fs.readFileSync(ruta, "utf8");

  try {
    const data = JSON.parse(fileContents);
    res.json({
      municipios : data,
    });
  } catch (err) {
    console.error(err);
  }
});

route.post("/crear", (req, res) => {
  res.json({
    probando: "Hola Mundo",
  });
});

module.exports = route;
