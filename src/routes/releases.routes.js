import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import E_fileUpload from 'express-fileupload';
import ReleaseController from '../Controllers/ReleaseController';
const route = Router();
route.use(E_fileUpload())

route.post("/licitacion", [validarJWT], ReleaseController.licitacionCreate);
route.get("/licitacion/:id",  ReleaseController.licitacionShow);
route.post("/adjudicacion", [validarJWT], ReleaseController.adjudicacionCreate);
route.get("/adjudicacion/:id",  ReleaseController.adjudicacionShow);
route.post("/contrato", [validarJWT], ReleaseController.contratoCreate);
route.get("/licitcontratoacion/:id",  ReleaseController.contratoShow);
module.exports = route;