const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const adController = require('./controllers/adController');

router.use(authController);
router.use(homeController);
router.use(adController);
router.all('*', (req, res) => {
    res.render('404');
});

module.exports = router;