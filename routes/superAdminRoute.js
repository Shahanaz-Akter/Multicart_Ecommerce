const express = require('express');
const router = express.Router();

const { Super, dashboard, addProduct, ProductList, productCategory, addExpense, expenseList, addCustomer, customerList, productReport, expenseReport, customerReport } = require('../controllers/superAdminController');

// router.get('/', dashboard);
router.get('/dashboard', dashboard);
router.get('/super', Super);


router.get('/add_product', addProduct);
router.get('/Product_list', ProductList);
router.get('/category', productCategory);

router.get('/add_expense', addExpense);
router.get('/expense_list', expenseList);

router.get('/add_customer', addCustomer);
router.get('/customer_list', customerList);

router.get('/product_report', productReport);
router.get('/expense_report', expenseReport);
router.get('/customer_report', customerReport);



module.exports = router;