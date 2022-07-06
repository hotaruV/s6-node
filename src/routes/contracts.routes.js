import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import E_fileUpload from 'express-fileupload';
import ContractsController from '../Controllers/ContractsController';
const route = Router();
route.use(E_fileUpload())


route.post("/contractperiod", [validarJWT], ContractsController.ContractPeriod);
route.post("/value", [validarJWT], ContractsController.value);
route.post("/", [validarJWT], ContractsController.contractCreate);
route.get("/:id", [validarJWT], ContractsController.contractShow);

module.exports = route;
