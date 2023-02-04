const { register, login } = require('../services/userService');
const { parseError } = require('../utility/parser');
const validator = require('validator');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) => {
    try {
        if (validator.isEmail(req.body.email) === false) {
            throw new Error('Invalid email');
        }
        if (req.body.username === '' || req.body.password === '') {
            throw new Error('All fields are required');
        }
        if (req.body.password.length < 5) {
            throw new Error('Passwords must be at least 5 characters long');
        }
        if (req.body.password !== req.body.rePassword) {
            throw new Error('Passwords must match');
        }
        const token = await register(req.body.email, req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        const errors = parseError(err);

        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                email: req.body.email,
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
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = parseError(err);
        res.render('login', {
            title: 'Login page',
            errors,
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;