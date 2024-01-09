const express = require('express');
const router = express.Router();
// const multer = require('multer');
const { addProduct, postAddProduct, ProductList, productCategory, editProduct, deleteProduct, ProductDetails } = require('../controllers/productController');

const upload = require('../multer');


router.get('/add_product', addProduct);
// Handle the post request for adding a product
router.post('/post_add_product', upload.fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: Infinity }, // Assuming you want to upload up to 5 secondary images
]), postAddProduct);


router.get('/Product_list', ProductList);
router.get('/category', productCategory);


router.get('/product_details/:id', ProductDetails);

router.get('/edit_product', editProduct);
router.get('/delete_product', deleteProduct);


module.exports = router;