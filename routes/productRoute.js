const express = require('express');
const router = express.Router();

const { addProduct, postAddProduct, ProductList, productCategory } = require('../controllers/productController');

router.get('/add_product', addProduct);
router.post('/post_add_product', postAddProduct);

router.get('/Product_list', ProductList);
router.get('/category', productCategory);

module.exports = router;