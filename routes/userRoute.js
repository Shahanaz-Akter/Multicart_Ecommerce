const express = require('express');
const router = express.Router();

const { Logout, userView, aboutUs, productDetails, cart, category, Login, postLogin, register, postReview, post_checkout, menBoysCategory,
    womensCategory, homeGadgetsCategory, kitchenDiningCategory, healthBeautyCategory, babyKidsCategory, shaverTrimmerCategory, electronicsCategory } = require('../controllers/userController');

router.get('/', userView);
router.get('/ses', (req, res) => {
    res.send(req.session.cart);
});
router.get('/index', userView);
router.get('/about_us', aboutUs);
router.get('/product_details', productDetails);

router.get('/product_category/categories/mens-and-boys-fashion', menBoysCategory);
router.get('/product_category/categories/womens-and-girls-fashion', womensCategory);
router.get('/product_category/categories/home-and-gadgets', homeGadgetsCategory);
router.get('/product_category/categories/kitchen-and-dining', kitchenDiningCategory);
router.get('/product_category/categories/health-and-beauty', healthBeautyCategory);
router.get('/product_category/categories/baby-and-kids', babyKidsCategory);
router.get('/product_category/categories/shaver-and-trimmer', shaverTrimmerCategory);
router.get('/product_category/categories/electronics', electronicsCategory);

router.get('/login', Login);
router.get('/logout', Logout);

router.post('/post_login', postLogin);
router.get('/register', register);
router.post('/post_review/:id', postReview);
router.get('/cart', cart);
router.post('/post_checkout', post_checkout);



module.exports = router;