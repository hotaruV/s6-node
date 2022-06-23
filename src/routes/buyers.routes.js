const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const BuyersController = require('../Controllers/BuyersController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/", [validarJWT], BuyersController.buyer);

module.exports = route;