const {Router} = require('express');
const router = Router();
const TopicController = require('../Controllers/topicController');
const md_auth = require('../middlewares/auth')

router.get('/topic/test', TopicController.test);
router.post('/topic/save',md_auth.auth ,TopicController.save);
router.get('/topic/getAll/:page?',TopicController.getTopics);
router.get('/topic/byuser/:user',TopicController.getTopicByUser);
router.get('/topic/byCategorie/:categoria',TopicController.getTopicByCategorie);
router.get('/topic/oneTopic/:id',TopicController.getOneTopic);
router.put('/topic/update/:id', md_auth.auth, TopicController.update);
router.delete('/topic/delete/:id',md_auth.auth, TopicController.delete);
router.get('/topic/search/:search', TopicController.search);
module.exports = router;


