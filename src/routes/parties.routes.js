const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const PartiesController = require('../Controllers/PartiesController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/identifier", [validarJWT], PartiesController.identifier);
route.post("/address", [validarJWT], PartiesController.address);
route.post("/contactPoint", [validarJWT], PartiesController.contactPoint);
route.post("/", [validarJWT], PartiesController.partiesCreate);
route.get("/:id", [validarJWT], PartiesController.partiesShow);

module.exports = route;