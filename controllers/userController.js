
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const userView = async (req, res) => {
    res.render('user/index.ejs');
}
const aboutUs = async (req, res) => {
    res.render('user/about_us.ejs');
}
const productDetails = async (req, res) => {
    res.render('user/product_details.ejs');
}
const cart = async (req, res) => {
    res.render('user/cart.ejs');
}
const category = async (req, res) => {
    res.render('user/product_category.ejs');
}
const Login = async (req, res) => {
    res.render('user/authentication_login.ejs');
}
const register = async (req, res) => {
    res.render('user/authentication_register.ejs');
}

const postReview = (req, res) => {
    console.log('hghsdghgsh');
}

module.exports = { userView, aboutUs, productDetails, cart, category, Login, register, postReview }