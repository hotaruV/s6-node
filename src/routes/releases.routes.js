const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const ReleaseController = require('../Controllers/ReleaseController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/licitacion", [validarJWT], ReleaseController.licitacionCreate);
route.get("/licitacion/:id",  ReleaseController.licitacionShow);

module.exports = route;