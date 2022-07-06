import Router from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { validarcampos } from'../middlewares/validar-campos';
import { check } from'express-validator';
import ApiController  from "../Controllers/ApiController"
const route = Router();


//ruta de login


route.get('/summary', ApiController.Summary);

    
module.exports = route;