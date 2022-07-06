import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import E_fileUpload from 'express-fileupload';
import AwardsController from '../Controllers/AwardsController';
const route = Router();
route.use(E_fileUpload())

route.post("/contractPeriod", [validarJWT], AwardsController.contractPeriod);
route.post("/suppliers", [validarJWT], AwardsController.suppliers);
route.post("/value", [validarJWT], AwardsController.value);
route.post("/documents", [validarJWT], AwardsController.documents);
route.post("/", [validarJWT], AwardsController.awardsCreate);
route.get("/:id", AwardsController.awardsShow);

module.exports = route;