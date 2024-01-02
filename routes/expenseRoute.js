const express = require('express');
const router = express.Router();

const { addExpense } = require('../controllers/expenseController');

router.get('/add_expense', addExpense);

module.exports = router;