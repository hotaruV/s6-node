const { Router } = require('express');
const loginController = require('../Controllers/loginController');
const { validarcampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const route = Router();


//ruta de login
route.post('/', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarcampos
], loginController.login)

route.get('/renew', validarJWT, loginController.renewToken);

route.post('/change-password', [
    validarJWT, 
    check('lastpassword', 'El password es Obligatorio').not().isEmpty(), validarcampos]
    , loginController.resetPass)
    
module.exports = route;