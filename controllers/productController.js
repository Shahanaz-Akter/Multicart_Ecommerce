const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');
const multer=require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/front_assets/img1/");
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "_" + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage }).fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_image', maxCount: 1 },
]);

const addProduct = async (req, res) => {
    res.render('product/add_product.ejs');
};

const postAddProduct = asyncHandler(async (req, res) => {
    // Use multer to handle file uploads
    upload(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('File upload failed.');
        }

        try {
            console.log(req.files);
            let result = await models.Product.create({
                'name': req.body.name,
                'buying_price': req.body.buying_price,
                'selling_price': req.body.selling_price,
                'discount': req.body.discount,
                'product_category': req.body.product_category,
                'primary_image': '/public/front_assets/img1/' + req.files['primary_image'][0].filename,
                'secondary_image': 'public/front_assets/img1/' + req.files['secondary_image'][0].filename,
                'description': req.body.description,
                'colorVariants': req.body.colorVariants,
                'sizeVariants': req.body.sizeVariants,
                'total_qty': req.body.total_qty,
                'product_code': Math.floor(Math.random() * 1000) + 1,
                'date': req.body.date,
                'quantitys': req.body.quantitys,
            });

            console.log('Product created successfully:', result);
            res.redirect('/product/Product_list');
        } catch (err) {
            console.error('Error creating product:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});


const ProductList = async (req, res) => {
    try {
        let products = await models.Product.findAll();
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

const editProduct = async (req, res) => {
    res.render('product/edit_product.ejs');
}


const deleteProduct = async (req, res) => {
    // res.render('product/edit_product.ejs');
    console.log('Delete product file');
}

module.exports = { addProduct, postAddProduct, ProductList, productCategory, editProduct, deleteProduct }
