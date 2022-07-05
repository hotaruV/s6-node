import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import E_fileUpload from 'express-fileupload';
import PartiesController from '../Controllers/PartiesController';
const route = Router();
route.use(E_fileUpload())

route.post("/identifier", [validarJWT], PartiesController.identifier);
route.post("/address", [validarJWT], PartiesController.address);
route.post("/contactPoint", [validarJWT], PartiesController.contactPoint);
route.post("/", [validarJWT], PartiesController.partiesCreate);
route.get("/:id", [validarJWT], PartiesController.partiesShow);

module.exports = route;