import { Router } from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
const route = Router();

route.get("/", (req, res) => {
  // console.log(process.env)
  res.json({
    version: 1.0,
  });
});

route.get("/list-slp", (req, res) => {
  const ruta = resolve(__dirname, "../documents/municipios.json");
  console.log(ruta);
  const fileContents = readFileSync(ruta, "utf8");

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

export default route;
