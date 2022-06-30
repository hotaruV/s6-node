const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const LicitacionController = require('../Controllers/LicitacionController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/licitacion", [validarJWT], LicitacionController.licitacionCreate);
<<<<<<< HEAD
route.get("/licitacion/:id",  LicitacionController.licitacionShow);
=======
route.get("/licitacion/:id", LicitacionController.licitacionShow);
>>>>>>> 89657b8a750415f7e8a31c69fa948d4f993eac31

module.exports = route;