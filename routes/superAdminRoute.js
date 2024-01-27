const express = require('express');
const router = express.Router();
const upload = require('../multer');

const { Super, dashboard, addProduct, ProductList, productCategory, addExpense, expenseList, addCustomer, customerList, productReport, expenseReport, customerReport, addLogo, addBanner, postAddLogo, postAddBanner
} = require('../controllers/superAdminController');

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
router.get('/add_logo', addLogo);
router.post('/post_add_logo', upload.fields([{ name: 'logo_image', maxCount: 1 },]), postAddLogo);
router.get('/add_banner', addBanner);
router.post('/post_add_banner', upload.fields([{ name: 'banner_image', maxCount: Infinity },]), postAddBanner);

module.exports = router;