const express = require('express');
const router = express.Router();

const { userView, aboutUs, productDetails, cart, category, Login, register, postReview } = require('../controllers/userController');

router.get('/', userView);
router.get('/index', userView);
router.get('/about_us', aboutUs);
router.get('/product_details', productDetails);
router.get('/cart', cart);
router.get('/product_category', category);
router.get('/login', Login);
router.get('/register', register);
router.get('/post_review', postReview);



module.exports = router;