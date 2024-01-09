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
            'secondary_image': secondaryImages,
            'description': req.body.description,
            'colorVariants': req.body.colorVariants,
            'sizeVariants': req.body.sizeVariants,
            'total_qty': req.body.total_qty,
            'product_code': Math.floor(Math.random() * 1000) + 1,
            'date': req.body.date,
            'quantitys': req.body.quantitys,
        });

        // console.log('Product created successfully:', result);
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
        // console.log('Error fetching product list:', error);
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
    // console.log(details_secondary_img);
    res.render('product/product_details.ejs', { details_secondary_img });
}

const editProduct = async (req, res) => {
    res.render('product/edit_product.ejs');
}


const deleteProduct = async (req, res) => {
    // res.render('product/edit_product.ejs');
    console.log('Delete product file');
}

module.exports = { addProduct, postAddProduct, ProductList, productCategory, ProductDetails, editProduct, deleteProduct }
