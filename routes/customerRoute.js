const express = require('express');
const router = express.Router();

const { addCustomer, postCustomer, customerList } = require('../controllers/customerController');

router.get('/add_customer', addCustomer);
router.post('/post_customer', postCustomer);
router.get('/customer_list', customerList);

module.exports = router;