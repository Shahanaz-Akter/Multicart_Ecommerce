const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');
const Logout = async (req, res) => {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.redirect('/login');
        } else {
            res.redirect('/');
            // Redirect to login or any other page after logout
        }
    });
}

const userView = async (req, res) => {

    let products = await models.Product.findAll();
    // let logo_img = await models.Crm.findAll();

    let logo_img = await models.Crm.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
    });


    let banner = await models.Crm.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
    });
    // console.log('logo: ', logo_img);

    // console.log('banner: ', banner);

    // let bn = JSON.parse(banner.banner_image)
    // console.log(banner.banner_image.length);
    // console.log(typeof (banner.banner_image));

    // console.log(bn.length);
    // console.log(typeof (bn));

    let bannerImageArray = [];

    // if (banner && banner.banner_image) {
    //     try {
    //         bannerImageArray = JSON.parse(banner.banner_image);

    //     } catch (error) {
    //         console.error('Error parsing banner_image:', error);
    //     }
    // }
    // let bn = JSON.parse(banner.banner_image);
    // console.log(typeof (banner.banner_image));
    // console.log(typeof (bn));
    // console.log("Array: ", bannerImageArray);


    res.render('user/index.ejs', { products, logo_img, banner, locals: { session: req.session } });
}
const aboutUs = async (req, res) => {
    res.render('user/about_us.ejs', { locals: { session: req.session } });
}
const productDetails = async (req, res) => {
    res.render('user/product_details.ejs', { locals: { session: req.session } });
}
const cart = async (req, res) => {
    res.render('user/cart.ejs', { locals: { session: req.session } });
}
const category = async (req, res) => {
    let products = await models.Product.findAll();
    res.render('user/product_category.ejs', { products });
}
const Login = async (req, res) => {
    let error = req.query.error;
    res.render('user/authentication_login.ejs', { error, locals: { session: req.session } });
}


const postLogin = async (req, res) => {
    const { user_name, mobile } = req.body;
    let customer = await models.Customer.findOne({ where: { mobile: mobile } });

    if (customer) {
        if (customer.mobile == mobile) {
            res.redirect('/');
        }
        else {
            let msg = encodeURIComponent('Invalid User');
            res.redirect(`/login/?error=${msg}`);
        }
    }
    else {
        let msg = encodeURIComponent('User Not Found');
        res.redirect(`/login/?error=${msg}`);
    }
}

const register = async (req, res) => {
    res.render('user/authentication_register.ejs', { locals: { session: req.session } });
}

const postReview = async (req, res) => {
    try {
        const id = req.params.id;
        const { comments } = req.body;
        let review_list = await models.Review.create({
            'name': 'John Doe',
            'comments': comments,
            'thumb': 'fa-thumbs-down',
            'like': 'fa-thumbs-up',
            'date': Date.now(),
            'star': 'fa-star',
        });

        res.redirect(`/product/product_details/${id}`);

    }
    catch (err) {
        console.log('Storing reviews error: ', err);
    }

}


const menBoysCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Mens and Boys Fashion'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/menboys_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);
    }
}

const womensCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Womens and Girls Fashion'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/womengirls_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const homeGadgetsCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Home and Gadgets'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/homegadgets_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }
    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const kitchenDiningCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Kitchen & Dining'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/kitchendining_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const healthBeautyCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Health & Beauty'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/healthbeauty_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const babyKidsCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Baby & Kids'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/babykids_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const shaverTrimmerCategory = async (req, res) => {
    let products = await models.Product.findAll();


    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Shaver & Trimmer'
            }
        });
        let le = single_product.length;
        // console.log("bbbb", single_product, le);
        res.render('user/shavertrimmer_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }

}
const electronicsCategory = async (req, res) => {
    let products = await models.Product.findAll();

    try {
        let single_product = await models.Product.findAll({
            where: {
                product_category: 'Electronics'
            }
        });
        let le = single_product.length;
        res.render('user/electronics_category.ejs', { record: single_product, locals: { session: req.session }, products });
    }

    catch (err) {
        console.log('Error Fetching Products: ', err);

    }


}

const post_checkout = async (req, res) => {
    const { mobile, email, customer_name, dob, country, zip_code, date, otp_num, delivery_charge, address, sub_total, total, discount } = req.body;
    // console.log('0' + mobile, email, customer_name, delivery_charge, address, sub_total, total, discount);
    try {
        let customer = await models.Customer.create({
            'customer_name': customer_name,
            'mobile': '0' + mobile,
            'dob': dob,
            'email': email,
            'country': country,
            'address': address,
            'zip_code': zip_code,
            'customer_id': Math.floor(Math.random() * 100) + 1,
            'date': date,
            'otp_num': 1234,
        });

        let order = await models.Order.create({
            'mobile': '0' + mobile,
            'customer_name': customer_name,
            'delivery_charge': delivery_charge,
            'address': address,
            'sub_total': sub_total,
            'discount': discount,
        });
        if (order) {
            res.redirect('/');
        }
    }

    catch (err) {
        console.log(err);
    }
}
module.exports = {
    Logout, userView, aboutUs, productDetails, cart, category, Login, register, postReview, post_checkout, postLogin, menBoysCategory,
    womensCategory, homeGadgetsCategory, kitchenDiningCategory, healthBeautyCategory, babyKidsCategory, shaverTrimmerCategory, electronicsCategory,
}