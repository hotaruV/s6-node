const {Router} = require('express');
const router = Router();
const ComentariosController = require('../Controllers/comentariosController');
const md_auth = require('../middlewares/auth');

router.post('/comentarios/topic/:topicId', md_auth.auth, ComentariosController.add);
router.put('/comentarios/:comentarioId', md_auth.auth, ComentariosController.update);
router.delete('/comentarios/:topicId/:comentarioId', md_auth.auth, ComentariosController.delete);

module.exports = router;