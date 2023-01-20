const router = require('express').Router();
const homeController = require('./controllers/homeController');
const catController = require('./controllers/catController');

router.get('/', homeController.getHomePage);
router.get('/cats/add-breed', homeController.getAddBreedPage);
router.get('/cats/add-cat', homeController.getAddCatPage);


module.exports = router;