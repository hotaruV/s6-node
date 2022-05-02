const {Router} = require('express');
const router = Router();
const CategoriasController = require('../Controllers/categoriaController');
const md_auth = require('../middlewares/auth');


router.get('/categorias/test', CategoriasController.test);
router.post('/categorias/save', CategoriasController.save);
router.get('/categorias/getAll/:page?',CategoriasController.getCategories);
router.get('/categorias/oneCategorie/:id',CategoriasController.getOnceCategorie);
router.put('/categorias/update/:id', md_auth.auth, CategoriasController.update);
router.delete('/categorias/delete/:id',md_auth.auth, CategoriasController.delete);


module.exports = router;