const express = require('express');
const clienteController = require('../Controllers/usuarioController');
const router = express.Router();
const md_auth = require('../middlewares/auth')
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: "./src/uploads/users"});

router.get('/probando', clienteController.probando);
router.post('/test', clienteController.test);

router.post('/registro', clienteController.saveC);
router.post('/login', clienteController.login);
router.put('/update', md_auth.auth, clienteController.update);
router.post('/upload', [md_upload, md_auth.auth], clienteController.uploadPefil);

router.get('/perfil/:perfil', clienteController.UserPicFile );
router.get('/usuario',md_auth.auth, clienteController.getAllUsers );
router.get('/usuario/:id', md_auth.auth, clienteController.getOneUsers );

module.exports = router;