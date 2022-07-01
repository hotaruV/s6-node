const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const ContractsController = require('../Controllers/ContractsController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())


route.post("/contractperiod", [validarJWT], ContractsController.ContractPeriod);

route.post("/value", [validarJWT], ContractsController.value);

route.post("/item", [validarJWT], ContractsController.items);
route.post("/item/classifications", [validarJWT], ContractsController.classifications);
route.post("/item/additionalClassifications", [validarJWT], ContractsController.additionalClassifications);

route.post("/", [validarJWT], ContractsController.contractCreate);
route.get("/:id", [validarJWT], ContractsController.contractShow);

module.exports = route;
