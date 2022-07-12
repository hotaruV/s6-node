import e, { Router } from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import { config } from "dotenv";
import ApiController from "../Controllers/ApiController"
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
      municipios: data,
    });
  } catch (err) {
    console.error(err);
  }
});

route.get("/entes-publicos", (req, res) => {
  const ruta = resolve(__dirname, "../documents/entesPublicos.json");
  console.log(ruta);
  const fileContents = readFileSync(ruta, "utf8");

  try {
    const data = JSON.parse(fileContents);
    res.json({
      data
    });
  } catch (err) {
    console.error(err);
  }
});


route.get("/servicios/productos", ApiController.cfdi);


// route.get("/servicios/productos", async (req, res) => {
//   let clave = parseInt(req.query.clave);
//   if (isNaN(clave) || null) {
//     clave = "01010101";
//   } else {
//     clave = Math.abs(clave);
//   }

//   const ruta = resolve(__dirname, "../documents/catalogo.json");
//   const fileContents = readFileSync(ruta, "utf8");
//   try {
//     const obs = JSON.parse(fileContents);
//     //let data = obs.filter((datas) => datas.clave >= clave)[0] || {};
//     res.json({ data: obs });
//   } catch (err) {
//     console.error(err);
//   }
// });

export default route;
