import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import E_fileUpload from 'express-fileupload';
import ItemsController from '../Controllers/ItemsController';
const route = Router();
route.use(E_fileUpload())

route.post("/", [validarJWT], ItemsController.items);
route.post("/classifications", [validarJWT], ItemsController.classifications);
route.post("/additionalClassifications", [validarJWT], ItemsController.additionalClassifications);
route.post("/unit/value", [validarJWT], ItemsController.itemValue);
route.post("/unit", [validarJWT], ItemsController.itemUnit);

module.exports = route;