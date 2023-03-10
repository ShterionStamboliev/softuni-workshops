const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.findByUser = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, password, rePass, description) => {

    if (password !== rePass) {
        throw new Error('Passwords dont match!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashPassword, description });

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
        description: user.description
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}