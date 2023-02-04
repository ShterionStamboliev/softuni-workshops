const { register, login } = require('../services/userService');
const { parseError } = require('../utility/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username === '' || req.body.password === '') {
            throw new Error('All fields are required');
        }
        if (req.body.password !== req.body.repassword) {
            throw new Error('Passwords must match');
        }
        const token = await register(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        const errors = parseError(err);

        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = parseError(err);
        res.render('login', {
            title: 'Login page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

module.exports = authController;