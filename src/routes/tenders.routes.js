const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const TendersController = require('../controllers/TendersController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/documents", [validarJWT], TendersController.documents);


module.exports = route;
