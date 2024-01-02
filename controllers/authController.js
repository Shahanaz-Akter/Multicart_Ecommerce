const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const register = (req, res, next) => {
    res.render('auth/register.ejs');
}

const login = (req, res, next) => {
    res.render('auth/login.ejs');
}

const postRegister = async (req, res) => {

    try {
        // const referer = req.header('Referer');
        // create json variable to hold data
        const user_record = {
            user_name: req.body.user_name,
            password: req.body.password,
            role: req.body.role,
        }

        console.log("User Record:", user_record);

        let result = await models.User.create({
            user_name: req.body.user_name,
            password: req.body.password,
            role: req.body.role,
        });

        res.redirect('/super_admin/dashboard');

    } catch (err) {
        console.log('Not Connect with Database');
        res.status(500).json({
            'message': 'Something went wrong',
            'error': err
        });
    }
}


module.exports = { register, login, postRegister };