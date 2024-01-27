const express = require('express');
const router = express.Router();

const { addCustomer, postCustomer, customerList, postRegisterCustomer, customerOtp, postOtp } = require('../controllers/customerController');

router.get('/add_customer', addCustomer);
router.post('/post_customer', postCustomer);
router.get('/customer_list', customerList);
router.post('/post_register_customer', postRegisterCustomer);

router.get('/customer_otp/:id', customerOtp);


router.post('/post_otp/:id', postOtp);

module.exports = router;