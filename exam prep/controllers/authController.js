const router = require('express').Router();
const userService = require('../services/authService');

router.get('/auth/login', (req, res) => {
    res.render('login');
});

router.get('/auth/register', (req, res) => {
    res.render('register');
});

router.post('/auth/register', async (req, res) => {
    const { username, password, rePass } = req.body;

    if (password !== rePass) {
        return res.render('register', { error: 'Passwords dont match'});
    }

    try {
        await userService.create({ username, password });
        res.redirect('/login');
    } catch (err) {
        // add db errors
        return res.render('register', { error: 'Passwords dont match'});
    }

});

module.exports = router;