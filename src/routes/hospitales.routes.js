const { Router } = require('express');
const HospitalesController = require('../controllers/HospitalesController');
const { validarcampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt')
const rout = Router();

rout.get('/', [validarJWT], HospitalesController.getHospital);
rout.post('/', [
        validarJWT,
        check('nombre', 'El Nombre del hospital es necesario').not().isEmpty(),
        validarcampos
    ],
    HospitalesController.createHospital);

rout.put('/:id', [
    validarJWT,
    check('nombre', 'El Nombre del hospital es necesario').not().isEmpty(),
    validarcampos
], HospitalesController.updateHospital);

rout.delete('/:id', validarJWT, HospitalesController.deleteHospital)


module.exports = rout;