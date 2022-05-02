const { Router } = require('express');
const loginController = require('../controllers/loginController');
const { validarcampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const rout = Router();


//ruta de login
rout.post('/', [
    check('email', 'El email es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarcampos
], loginController.login)

rout.post('/google', [
    check('token', 'El token de google es Obligatorio').not().isEmpty(),
    validarcampos
], loginController.loginGoogle)

rout.get('/renew', validarJWT, loginController.renewToken)



module.exports = rout;