const { Router } = require('express');
const MedicoController = require('../controllers/MedicosControllers');
const { validarcampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt')
const rout = Router();


rout.get('/', MedicoController.getMedico);
rout.post('/', [
        validarJWT,
        check('nombre', 'El Nombre del Médico es necesario').not().isEmpty(),
        check('hospital', 'ID invalido').isMongoId(),
        validarcampos
    ],
    MedicoController.createMedico);

rout.put('/:id', [
    validarJWT,
    check('nombre', 'El Nombre del Médico es necesario').not().isEmpty(),
    check('hospital', 'ID invalido').isMongoId(),
    validarcampos
], MedicoController.updateMedico);

rout.delete('/:id', validarJWT, MedicoController.deleteMedico)

module.exports = rout;