const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const addProduct = async (req, res) => {
    res.render('product/add_product.ejs');
}
const postAddProduct = async (req, res) => {
    let data = {
        'name': req.body.name,
        'buying_price': req.body.buying_price,
        'selling_price': req.body.selling_price,
        'discount': req.body.discount,
        'primary_image': req.body.primary_image,
        'secondary_image': req.body.secondary_image,
        'product_code': rand(),
        'product_category': req.body.product_category,
        'total_qty': req.body.total_qty,
        'colorVariant': req.body.colorVariant,
        'sizeVariant': req.body.sizeVariant,
        'qty': req.body.qty,
        'date': req.body.date,
    }
    console.log(data);
}

const ProductList = async (req, res) => {
    res.render('product/product_list.ejs');
}
const productCategory = async (req, res) => {
    res.render('product/category.ejs');
}

module.exports = { addProduct, postAddProduct, ProductList, productCategory }