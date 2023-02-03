const { register } = require('../services/userService');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username === '' || req.body.password === '') {
            throw new Error('All fields are required');
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords must match');
        }
        const token = await register(req.body.username, req.body.password);
    
        res.cookie('token', token);
        res.redirect('/auth/register');

    } catch(err) {

        const errors = [err.message];

        res.render('register', {
            title: 'Register page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

module.exports = authController;