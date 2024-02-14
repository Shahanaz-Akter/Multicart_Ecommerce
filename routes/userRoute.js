const express = require('express');
const router = express.Router();

const { shop, Logout, userView, aboutUs, productDetails, cart, category, Login, postLogin, register, postReview, post_checkout, menBoysCategory,
    womensCategory, homeGadgetsCategory, kitchenDiningCategory, healthBeautyCategory, babyKidsCategory, shaverTrimmerCategory, electronicsCategory } = require('../controllers/userController');

router.get('/ses', (req, res) => {
    res.send(req.session.cart);
});
router.post('/product/product_increment', async (req, res) => {
    let id = req.body.product_id;
    let reason = req.body.reason;

    let cart = req.session.cart;
    let qty, total;
    await cart.forEach(element => {
        if (element.id == id) {
            if (reason == "plus") {
                element.quantity = element.quantity + 1;
                element.total = element.quantity * element.selling_price;
            }
            if (reason == "minus") {
                element.quantity = element.quantity - 1;
                element.total = element.total - element.selling_price;
            }
            qty = element.quantity;
            total = element.total;
        }
    });
    req.session.cart = cart;
    console.log('cart ', req.session.cart)
    res.send({
        success: true,
        locals: { session: req.session },
        qty: qty,
        total: total
    })

});
router.post('/product/calculate_subtotal', (req, res) => {

    let subT = 0;
    let cart = req.session.cart;
    cart.forEach(element => {

        subT = subT + element.total;
    });
    res.send({
        success: true,
        subtotal: subT
    })

});

router.post('/delete_session_product', async (req, res) => {
    let id = req.body.id;
    // console.log('Id is: ', id);
    let sessionProduct = req.session.cart;
    req.session.cart = sessionProduct.filter(element => element.id !== id);
    // console.log('bye: ', req.session.cart);
    res.send({
        success: true
    })

});


router.get('/', userView);
router.get('/index', userView);
router.get('/about_us', aboutUs);
router.get('/shop', shop);
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