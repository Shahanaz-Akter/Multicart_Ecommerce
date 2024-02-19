const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addProduct, postAddProduct, ProductList, productCategory, editProduct, deleteProduct, ProductDetails, postCartProduct, postEditProduct } = require('../controllers/productController');

const upload = require('../multer');

router.get('/add_product', addProduct);
// Handle the post request for adding a product
router.post('/post_add_product', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'category_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity },

]), postAddProduct);

router.get('/Product_list', ProductList);
router.get('/category', productCategory);

router.get('/product_details/:id', ProductDetails);

router.get('/edit_product/:id', editProduct);
router.post('/post_edit_product/:id', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'category_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity }]),
    postEditProduct);

router.get('/delete_product/:id', deleteProduct);
router.post('/post_cart_product', postCartProduct);

module.exports = router;