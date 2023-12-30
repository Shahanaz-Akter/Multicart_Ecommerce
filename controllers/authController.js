
const asyncHandler = require('express-async-handler');

const register = (req, res) => {
    res.render('auth/register.ejs');
}

const login = (req, res) => {
    res.render('auth/login.ejs');
}


module.exports = { register, login };