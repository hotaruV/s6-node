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
route.get("/contrato/:id",  ReleaseController.contratoShow);
route.get("/contratoAll",  ReleaseController.allContratos);
route.post("/implementacion", [validarJWT], ReleaseController.implementacionCreate);
route.get("/implementacion/:id",  ReleaseController.implementacionShow);
route.post("/enmienda", [validarJWT], ReleaseController.enmiendaCreate);
route.get("/enmienda/:id",  ReleaseController.enmiendaShow);
module.exports = route;