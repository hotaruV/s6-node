const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
//const AwardsController = require('../Controllers/AwardsController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

//route.post("/contractPeriod", [validarJWT], AwardsController.contractPeriod);


module.exports = route;