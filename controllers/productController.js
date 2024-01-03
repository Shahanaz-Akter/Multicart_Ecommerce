const asyncHandler = require('express-async-handler');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const models = require('../models');

const addProduct = async (req, res) => {
    res.render('product/add_product.ejs');
}
const postAddProduct = async (req, res) => {
    // const { name, buying_price, selling_price, discount, product_category, primary_image, secondary_image, description, colorVariants, sizeVariants, total_qty, date, quantitys } = req.body;
    try {

        let result = await models.Product.create({
            'name': req.body.name,
            'buying_price': req.body.buying_price,
            'selling_price': req.body.selling_price,
            'discount': req.body.discount,
            'product_category': req.body.product_category,
            'primary_image': req.body.primary_image,
            'secondary_image': req.body.secondary_image,
            'description': req.body.description,
            'colorVariants': req.body.colorVariants,
            'sizeVariants': req.body.sizeVariants,
            'total_qty': req.body.total_qty,
            'product_code': Math.floor(Math.random() * 1000) + 1,
            'date': req.body.date,
            'quantitys': req.body.quantitys
        });

        console.log('here1');
        console.log(req.body.primary_image);
        console.log('here2');
        res.redirect('/product/Product_list');

    }
    catch (err) {
        res.json({
            'msg': 'Something went Wrong',
            'error': err
        });
    }

}

const ProductList = async (req, res) => {
    try {
        let products = await models.Product.findAll();

        res.render('product/product_list.ejs', { products });
    }
    catch (error) {
        // console.log('Error fetching product list:', error);
        res.status(500).send('Internal Server Error');
    }
}
const productCategory = async (req, res) => {
    res.render('product/category.ejs');
}

const editProduct = async (req, res) => {
    res.render('product/edit_product.ejs');
}


const deleteProduct = async (req, res) => {
    // res.render('product/edit_product.ejs');
    console.log('Delete product file');
}

module.exports = { addProduct, postAddProduct, ProductList, productCategory, editProduct, deleteProduct }
