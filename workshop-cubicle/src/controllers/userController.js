const User = require('../models/User');

const postUserRegister = ('/register', async (req, res) => {
    const { username, password } = req.body;

    await User.create({ username, password });

    res.redirect('/');
});

module.exports = {
    postUserRegister
};