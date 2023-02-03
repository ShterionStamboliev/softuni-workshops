const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const token_secret = 'sadf243jnasdfas';

async function register(username, password) {
    const exist = await User.findOne({
        username
    }).collation({
        locale: 'en', strength: 2
    });
    if (exist) {
        throw new Error('Username is already taken');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashPassword
    });

    const token = createSession(user);
    return token;
}

async function login() {

}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    }

    const token = jwt.sign(payload, token_secret);
    return token;
}


function tokenVerify() {

}

module.exports = {
    register,
    login,
    tokenVerify
}