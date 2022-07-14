import usuarioController from "../Controllers/UsuarioController.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarcampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { isAdminRole } from "../middlewares/validar-roles";

const route = Router();

route.get("/user_all", validarJWT, usuarioController.getUser);
route.post("/register", [
    check("nombres", "El Campo Nombre(s) es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio").isEmail(),
    check("rfc", "El Campo RFC es Obligatorio").not().isEmpty(),
    validarcampos,
    validarJWT,
    isAdminRole ],
    usuarioController.createUsers
    );
    
route.get("/id", [validarJWT], usuarioController.getDataUser);

route.put("/buscar/:id",
  [
    validarJWT,
    check("nombres", "El Campo Nombre(s) es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio").isEmail(),
    check("rfc", "El Campo RFC es Obligatorio").not().isEmpty(),
    validarcampos,
  ],
  usuarioController.updateUser
);

route.get("/buscar-uno/:id", [validarJWT], usuarioController.getOneUser);


route.put("/:id", validarJWT, usuarioController.updateUser);
route.post("/create_admin_sea", usuarioController.createAdminUser);
route.put(
  "/reset_password/:id",
  [validarJWT],
  usuarioController.resetPasswordUser
);
//route.delete("/:id", validarJWT, usuarioController.deleteUser);

module.exports = route;
