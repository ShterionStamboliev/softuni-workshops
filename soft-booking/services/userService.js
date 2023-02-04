const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const token_secret = 'sadf243jnasdfas';

async function register(email, username, password) {
    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
        throw new Error('Username is already taken');
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error('Email is already taken');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashPassword
    });

    const token = createSession(user);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashPassword);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    const token = createSession(user);
    return token;
}

function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    }

    const token = jwt.sign(payload, token_secret);
    return token;
}


function tokenVerify(token) {
    return jwt.verify(token, token_secret);
}

module.exports = {
    register,
    login,
    tokenVerify
}