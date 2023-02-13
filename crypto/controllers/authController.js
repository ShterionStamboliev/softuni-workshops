const router = require('express').Router();
const auth = require('../services/authService');
const { isAuthorized } = require('../middleware/auth');
const { getErrorMessage } = require('../util/errors')

router.get('/auth/login', (req, res) => {
    res.render('login');
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await auth.login(email, password);
        res.cookie('session', token);
        res.redirect('/');

    } catch (error) {
        return res.status(404).render('login', { error: getErrorMessage(error) })
    }
});

router.get('/auth/register', (req, res) => {
    res.render('register');
});

router.post('/auth/register', async (req, res) => {
    const { username, email, password, rePass } = req.body;

    try {
        const token = await auth.register(username, email, password, rePass);
        res.cookie('session', token);
        res.redirect('/');

    } catch (error) {
        return res.status(400).render('register', { error: getErrorMessage(error) } );
    }
});

router.get('/auth/logout', isAuthorized, (req, res) => {
    res.clearCookie('session');
    res.redirect('/');
});

module.exports = router;