const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const addProduct = async (req, res) => {
    res.render('product/add_product.ejs');
};

const postAddProduct = async (req, res) => {
    // Use multer to handle file uploads
    try {
        // console.log(req.files);
        let secondaryImages = [];
        for (let i = 0; i < req.files['secondary_image'].length; i++) {
            secondaryImages.push('/front_assets/new_img/' + req.files['secondary_image'][i].filename);
        }

        let result = await models.Product.create({
            'name': req.body.name,
            'buying_price': req.body.buying_price,
            'selling_price': req.body.selling_price,
            'discount': req.body.discount,
            'product_category': req.body.product_category,
            'primary_image': '/front_assets/new_img/' + req.files['primary_image'][0].filename,
            'category_image': '/front_assets/new_img/' + req.files['category_image'][0].filename,
            'secondary_image': JSON.stringify(secondaryImages),
            'description': req.body.description,
            'product_type': req.body.product_type,
            'colorVariants': req.body.colorVariants,
            'sizeVariants': req.body.sizeVariants,
            'total_qty': req.body.total_qty,
            'product_code': Math.floor(Math.random() * 1000) + 1,
            'date': req.body.date,
            'quantitys': req.body.quantitys,
        });
        // console.log(typeof (result.secondary_image));
        // console.log(result.secondary_image);
        // console.log('ggg');
        // console.log(typeof (JSON.parse(result.secondary_image)));
        // console.log(JSON.parse(result.secondary_image));
        // console.log(typeof (JSON.parse(result.secondary_image)));
        console.log(result);

        res.redirect('/product/Product_list');
    }
    catch (err) {
        console.error('Error creating product:', err);
        // res.status(500).send('Internal Server Error');
    }
}

const ProductList = async (req, res) => {
    try {
        let products = await models.Product.findAll();
        // console.log(products);
        res.render('product/product_list.ejs', { products });
    }
    catch (error) {
        res.status(500).send('Internal Server Error', error);
    }
}
const productCategory = async (req, res) => {

    let products = await models.Product.findAll();
    res.render('product/category.ejs', { products });
}
const ProductDetails = async (req, res) => {
    const productId = req.params.id;
    let details_secondary_img = await models.Product.findOne({
        where: {
            id: productId,
        }
    });

    let reviews = await models.Review.findAll();
    res.render('product/product_details.ejs', { details_secondary_img, reviews, locals: { session: req.session } });
}

const postCartProduct = async (req, res) => {
    const { product_id } = req.body;
    let specific_record = await models.Product.findOne({
        where: {
            id: product_id,
        }
    });

    // Retrieve existing cart from session or create an empty array
    let cart = req.session.cart || [];
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === specific_record.id);

    if (!existingProduct) {
        // If not in the cart, add it
        let cart_data = {
            product_id: specific_record.id,
            image: specific_record.primary_image,
            name: specific_record.name,
            quantity: 1,
            price: specific_record.buying_price,
            total: specific_record.buying_price,
        }
        cart.push(cart_data);
        // Update the session with the modified cart
        req.session.cart = cart;
    }
    // console.log('Cart Items: ', cart);
    return res.send({
        'record': specific_record,
        'cart': cart,
    });
}

const editProduct = async (req, res) => {
    let id = req.params.id;
    let record = await models.Product.findOne({
        where: {
            'id': id
        }
    });
    // console.log(record);
    res.render('product/edit_product.ejs', { record });
}

const postEditProduct = async (req, res) => {
    let id = req.params.id;
    let record = await models.Product.findOne({
        where: {
            'id': id
        }
    });
    await record.update({
        'name': req.body.name,
        'buying_price': req.body.buying_price,
        'selling_price': req.body.selling_price,
        'discount': req.body.discount,
        'product_category': req.body.product_category,
        'primary_image': '',
        'secondary_image': '',
        'description': req.body.description,
        'product_type': req.body.product_type,
        'colorVariants': '',
        'sizeVariants': '',
        'total_qty': req.body.total_qty,
        'product_code': Math.floor(Math.random() * 1000) + 1,
        'date': req.body.date,
        'quantitys': req.body.quantitys,
    });
    // console.log(record);
    res.redirect('/product/product_list');
}
const deleteProduct = async (req, res) => {
    // res.render('product/edit_product.ejs');
    let id = req.params.id;
    let record = await models.Product.findOne({
        where: {
            'id': id
        }
    });
    await record.destroy();
    res.redirect('/product/product_list');
}

module.exports = { addProduct, postAddProduct, ProductList, productCategory, ProductDetails, postCartProduct, editProduct, postEditProduct, deleteProduct }
