const {Router} = require('express');
const router = Router();
const MailController = require('../Controllers/mailController');
const md_auth = require('../middlewares/auth');


router.post('/mailer/findDoctor', MailController.findDoctor);
router.post('/mailer/convenios', MailController.conveniosForm);
router.post('/mailer/agenda', MailController.AgendaForm);


module.exports = router;