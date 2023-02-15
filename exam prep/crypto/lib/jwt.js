const jwt = require('jsonwebtoken');
const utils = require('util');

exports.sign = utils.promisify(jwt.sign);
exports.verify = utils.promisify(jwt.verify);