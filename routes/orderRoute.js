const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addOrder, orderList, editOrder, deleteOrder, statusChange } = require('../controllers/orderController');

const upload = require('../multer');

router.get('/add_order', addOrder);
router.get('/order_list', orderList);

router.post('/status_change', statusChange);
router.get('/edit_order/:id', editOrder);

router.get('/delete_order/:id', deleteOrder);

module.exports = router;