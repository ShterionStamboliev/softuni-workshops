const router = require('express').Router();

router.get('/auth/login', (req, res) => {
    res.render('login');
});

router.get('/auth/register', (req, res) => {
    res.render('register');
});

module.exports = router;