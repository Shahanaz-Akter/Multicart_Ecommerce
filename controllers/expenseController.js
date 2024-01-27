const asyncHandler = require('express-async-handler');
const models = require('../models');
const addExpense = async (req, res) => {
    res.render('expense/add_expense.ejs');
}

const postExpense = async (req, res) => {

    console.log('hello');
    const { date, expense_type, expense_category, voucher_no, amount, description } = req.body;

    let result = await models.Expense.create({
        'date': date,
        'expense_type': expense_type,
        'expense_category': expense_category,
        'voucher_no': voucher_no,
        'amount': amount,
        'description': description,
    });

    console.log(result);
    res.redirect('/expense/expense_list');
}

const expenseList = async (req, res) => {
    res.render('expense/expense_list.ejs');
}

module.exports = { addExpense, postExpense, expenseList }