
const asyncHandler = require('express-async-handler');

const register = (req, res) => {
    res.render('auth/dashboard.ejs');
}

const dashboard = (req, res) => {
    res.render('superAdmin/master.ejs');
}


module.exports = { register, dashboard, };