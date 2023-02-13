const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const createController = require('./controllers/createController');

router.use(authController);
router.use(homeController);
router.use(createController);
router.all('*', (req, res) => {
    res.render('404');
});

module.exports = router;