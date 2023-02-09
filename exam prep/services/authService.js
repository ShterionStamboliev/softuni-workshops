const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.findByUser = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, rePass) => {
    if (password !== rePass) {
        throw new Error('Passwords dont match!');
    }

    const existingUser = await this.findByUser(username);

    if (existingUser) {
        throw new Error('Username or email already taken!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashPassword });

    return this.login(email, password);

};

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}