const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const ContractsController = require('../Controllers/ContractsController');
const E_fileUpload = require('express-fileupload');
const route = Router();
route.use(E_fileUpload())


route.post("/contractperiod", [validarJWT], ContractsController.ContractPeriod);

route.post("/", [validarJWT], ContractsController.contractCreate);
route.get("/:id", [validarJWT], ContractsController.contractShow);

module.exports = route;
