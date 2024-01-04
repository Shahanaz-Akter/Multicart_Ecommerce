const express = require('express');
const router = express.Router();

const { productReport, expenseReport, customerReport } = require('../controllers/reportController');

router.get('/product_report', productReport);
router.get('/expense_report', expenseReport);
router.get('/customer_report', customerReport);

module.exports = router;