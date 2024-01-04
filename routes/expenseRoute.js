const express = require('express');
const router = express.Router();

const { addExpense, postExpense, expenseList } = require('../controllers/expenseController');

router.get('/add_expense', addExpense);
router.post('/post_expense', postExpense);
router.get('/expense_list', expenseList);


module.exports = router;