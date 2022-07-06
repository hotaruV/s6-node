import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarcampos } from'../middlewares/validar-campos';
import { check } from'express-validator';
import ApiController  from "../Controllers/ApiController"
const route = Router();


//ruta de login


route.get('/summary', ApiController.Summary);
route.get('/top/:n/buyers', ApiController.topBuyers);
route.get('/top/:n/suppliers', ApiController.topsupplier);

    
module.exports = route;