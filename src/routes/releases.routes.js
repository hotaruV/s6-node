const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const LicitacionController = require('../Controllers/LicitacionController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/licitacion", [validarJWT], LicitacionController.licitacionCreate);
route.get("/licitacion/:id", LicitacionController.licitacionShow);

module.exports = route;