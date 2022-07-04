import Router from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import BuyersController from "../Controllers/BuyersController";

const route = Router();
route.post("/", [validarJWT], BuyersController.buyer);
module.exports = route;
