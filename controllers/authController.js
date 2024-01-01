
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

        console.log('hello1');
        console.log(req.body.user_name);
        // console.log(user_record);
        console.log('hello2');

        let result = await models.User.create({
            user_name: req.body.user_name,
            password: req.body.password,
            role: req.body.role
        });

        res.status(200).json({
            'message': 'Successfully',
            'post': result
        });

        // Redirect only after the database operation is successful
        // res.redirect('/');

    } catch (error) {
        res.status(200).json({
            'message': 'Wrong',
            'error': error
        });
    }
}


module.exports = { register, login, postRegister };