const usuarioController = require('../controllers/usuarioController')
const { Router } = require('express');
const { check } = require('express-validator')
const { validarcampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const rout = Router();

rout.get('/', validarJWT, usuarioController.getUser)
rout.post('/',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarcampos,
    ], usuarioController.createUsers);

rout.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarcampos,
    ], usuarioController.updateUser);

rout.delete('/:id',validarJWT ,usuarioController.deleteUser)

module.exports = rout;