const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const TendersController = require('../Controllers/TendersController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/documents", [validarJWT], TendersController.documents);
route.post("/procuringEntity", [validarJWT], TendersController.procuringEntity);
route.post("/tenderPeriod", [validarJWT], TendersController.tenderPeriod);
route.post("/awardPeriod", [validarJWT], TendersController.awardPeriod);
route.post("/enquiryPeriod", [validarJWT], TendersController.enquiryPeriod);
route.post("/minValue", [validarJWT], TendersController.minValue);
route.post("/value", [validarJWT], TendersController.value);

module.exports = route;