const usuarioController = require("../Controllers/usuarioController");
const { Router } = require("express");
const { check } = require("express-validator");
const { validarcampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isAdminRole } = require("../middlewares/validar-roles");

const route = Router();

route.get("/user_all", validarJWT, usuarioController.getUser);
route.post(
  "/register",
  [
    check("nombres", "El Campo Nombre(s) es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio").isEmail(),
    check("rfc", "El Campo RFC es Obligatorio").not().isEmpty(),
    validarcampos,
    validarJWT,
    isAdminRole,
  ],
  usuarioController.createUsers
);

route.put(
  "/buscar/:id",
  [
    validarJWT,
    check("nombres", "El Campo Nombre(s) es Obligatorio").not().isEmpty(),
    check("email", "El email es Obligatorio").isEmail(),
    check("rfc", "El Campo RFC es Obligatorio").not().isEmpty(),
    validarcampos,
  ],
  usuarioController.updateUser
);

route.get("/buscar-uno/:id", [validarJWT],usuarioController.getOneUser );
route.put("/:id", validarJWT, usuarioController.updateUser);
route.post("/superAdmin", usuarioController.createAdminUser);
//route.delete("/:id", validarJWT, usuarioController.deleteUser);

module.exports = route;
