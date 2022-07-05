import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import TendersController from '../Controllers/TendersController';
import E_fileUpload from 'express-fileupload';
const route = Router();
route.use(E_fileUpload());

route.post("/documents", [validarJWT], TendersController.documents);
route.post("/procuringEntity", [validarJWT], TendersController.procuringEntity);
route.post("/tenderPeriod", [validarJWT], TendersController.tenderPeriod);
route.post("/awardPeriod", [validarJWT], TendersController.awardPeriod);
route.post("/enquiryPeriod", [validarJWT], TendersController.enquiryPeriod);
route.post("/minValue", [validarJWT], TendersController.minValue);
route.post("/value", [validarJWT], TendersController.value);
route.post("/item", [validarJWT], TendersController.items);
//route.get("/item:id", [validarJWT], TendersController.items);
route.post("/item/classifications", [validarJWT], TendersController.classifications);
route.post("/item/additionalClassifications", [validarJWT], TendersController.additionalClassifications);
route.post("/item/TendersItemValue", [validarJWT], TendersController.TendersItemValue);
route.post("/item/TendersItemUnit", [validarJWT], TendersController.TendersItemUnit);
route.post("/", [validarJWT], TendersController.tendersCreate);
route.get("/:id", [validarJWT], TendersController.tendersShow);

module.exports = route;
