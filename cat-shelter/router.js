const router = require('express').Router();
const homeController = require('./controllers/homeController');
const catController = require('./controllers/catController');

router.get('/', homeController.getHomePage);
router.get('/cats/add-breed', catController.getAddBreed);
router.get('/cats/add-cat', catController.getAddCat);
router.post('/cats/add-cat', catController.postAddCat);
router.post('/cats/add-breed', catController.postAddBreed);

module.exports = router;