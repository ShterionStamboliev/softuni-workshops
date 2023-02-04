const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const token_secret = 'sadf243jnasdfas';

async function register(username, password) {
    const exists = await User.findOne({ username });

    if (exists) {
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

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    const token = createSession(user);
    return token;
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