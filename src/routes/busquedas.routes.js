const { Router } = require('express');
const BusquedaController = require('../controllers/BusquedaController');
const { validarcampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt')
const rout = Router();

rout.get('/:busqueda', validarJWT, BusquedaController.buscarTodo)
rout.get('/coleccion/:tabla/:busqueda', validarJWT, BusquedaController.buscarDocumentos)



module.exports = rout;