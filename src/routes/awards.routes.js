const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const AwardsController = require('../Controllers/AwardsController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())

route.post("/contractPeriod", [validarJWT], AwardsController.contractPeriod);
route.post("/suppliers", [validarJWT], AwardsController.suppliers);
route.post("/value", [validarJWT], AwardsController.value);
route.post("/documents", [validarJWT], AwardsController.documents);
route.post("/item", [validarJWT], AwardsController.items);
route.post("/item/classifications", [validarJWT], AwardsController.classifications);
route.post("/item/additionalClassifications", [validarJWT], AwardsController.additionalClassifications);
route.post("/item/itemValue", [validarJWT], AwardsController.itemValue);

module.exports = route;