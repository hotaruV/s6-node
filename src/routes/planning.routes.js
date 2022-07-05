import Router from 'express';
import E_fileUpload from 'express-fileupload';
const route = Router();
route.use(E_fileUpload())

//route.post("/contractPeriod", [validarJWT], AwardsController.contractPeriod);


module.exports = route;