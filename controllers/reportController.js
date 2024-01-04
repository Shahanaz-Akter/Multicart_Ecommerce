const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const productReport = async (req, res) => {
    let products = await models.Product.findAll();
    res.render('report/product_report.ejs', { products });
}

const expenseReport = async (req, res) => {
    let expenses = await models.Expense.findAll();
    res.render('report/expense_report.ejs', { expenses });
}

const customerReport = async (req, res) => {
    let customers = await models.Customer.findAll();
    res.render('report/customer_report.ejs', { customers });
}

module.exports = { productReport, expenseReport, customerReport }