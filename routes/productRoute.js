const express = require('express');
const router = express.Router();

const { addProduct, postAddProduct, ProductList, productCategory, editProduct, deleteProduct } = require('../controllers/productController');

router.get('/add_product', addProduct);
router.post('/post_add_product',postAddProduct);

router.get('/Product_list', ProductList);
router.get('/category', productCategory);

router.get('/edit_product', editProduct);
router.get('/delete_product', deleteProduct);


module.exports = router;