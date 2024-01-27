const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const register = async (req, res, next) => {
    res.render('auth/register.ejs');
}
const login = async (req, res, next) => {
    let error1 = req.query.error;
    let err1 = req.query.err;

    res.render('auth/login.ejs', { error: error1, err: err1 });
}

const postRegister = async (req, res) => {
    try {
        // const referer = req.header('Referer');
        // create json variable to hold data
        const user_record = {
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }

        console.log("User Record:", user_record);

        let result = await models.User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });

        res.redirect('/super_admin/dashboard');

    } catch (err) {
        res.status(500).json({
            'message': 'Something went wrong',
            'error': err
        });
    }
}

const postLogin = async (req, res, next) => {

    const { user_name, email, password } = req.body;
    let user = await models.User.findOne({ where: { email: email } });

    if (user) {
        if (user.email == email && user.password == password) {
            res.redirect('/super_admin/dashboard');
        }
        else {
            let msg = encodeURIComponent('Invalid User');
            res.redirect(`/auth/login/?error=${msg}`);
        }
    }
    else {
        let msg = encodeURIComponent('User Not Found');
        res.redirect(`/auth/login/?error=${msg}`);
    }
}

const postForgetPassword = async (req, res, next) => {

    const { email, } = req.body;
    let user = await models.User.findOne({ where: { email: email } });

    if (user) {
        console.log('valid email');
        res.redirect(`/auth/change_password/${user.id}`);

    }
    else {
        let errorMsg = encodeURIComponent('Invalid Email');
        res.redirect(`/auth/login/?err=${errorMsg}`);
    }
}
const changePassword = async (req, res, next) => {
    let params_id = req.params.id;
    res.render('auth/changepass.ejs', { id: params_id });

}
const postChangePassword = async (req, res, next) => {

    const { password, } = req.body;
    let id = req.params.id;

    let user = await models.User.findOne({ where: { id: id } });

    if (user) {
        await user.update({ password: password });

        console.log('Password updated successfully:', user);
        res.redirect('/super_admin/dashboard');

    }
    else {
        res.redirect('/auth/login');
    }

}

module.exports = { register, login, postLogin, postRegister, postForgetPassword, changePassword, postChangePassword };