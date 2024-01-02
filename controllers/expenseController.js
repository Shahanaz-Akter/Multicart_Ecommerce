const asyncHandler = require('express-async-handler');

const addExpense = (req, res) => {
    res.render('expense/add_expense.ejs');
}

module.exports = { addExpense, }