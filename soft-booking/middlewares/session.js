const { tokenVerify } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        console.log(token);
        try {
            const userData = tokenVerify(token);
            req.user = userData;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }

    next();
};