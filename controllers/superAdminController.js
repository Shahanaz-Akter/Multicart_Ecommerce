const asyncHandler = require('express-async-handler');

const dashboard = (req, res) => {
    res.render('layouts/master.ejs');
}

const Super = (req, res) => {
    res.render('user/super_admin.ejs');
}

const addProduct = (req, res) => {
    res.render('product/add_product.ejs');
}
const ProductList = (req, res) => {
    res.render('product/Product_list.ejs');
}
const productCategory = (req, res) => {
    res.render('product/category.ejs');
}

const addExpense = (req, res) => {
    res.render('expense/add_expense.ejs');
}
const expenseList = (req, res) => {
    res.render('expense/expense_list.ejs');
}

const addCustomer = (req, res) => {
    res.render('customer/add_customer.ejs');
}
const customerList = (req, res) => {
    res.render('customer/customer_list.ejs');
}


const productReport = (req, res) => {
    res.render('report/product_report.ejs');
}
const expenseReport = (req, res) => {
    res.render('report/expense_report.ejs');
}
const customerReport = (req, res) => {
    res.render('report/customer_report.ejs');
}
module.exports = { Super, dashboard, addProduct, ProductList, productCategory, addExpense, expenseList, addCustomer, customerList, productReport, expenseReport, customerReport }