const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const UploadController = require('../controllers/UploadFilesController');
const E_fileUpload = require('express-fileupload');
const rout = Router();

rout.use(E_fileUpload())


rout.put('/:tipo/:id', validarJWT, UploadController.fileUpload)
rout.get('/:tipo/:foto', validarJWT, UploadController.getImages)
module.exports = rout;