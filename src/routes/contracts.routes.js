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
route.post("/contractIm", [validarJWT], ContractsController.contractImCreate);
route.get("/contractIm/:id", [validarJWT], ContractsController.contractImShow);
route.post("/implementation", [validarJWT], ContractsController.implementation);
route.post("/contractEn", [validarJWT], ContractsController.contractEnCreate);
route.get("/contractEn/:id", [validarJWT], ContractsController.contractEnShow);

module.exports = route;
