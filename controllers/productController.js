const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const addProduct = async (req, res) => {
    let error1 = req.query.error1;
    let error2 = req.query.error2;
    let error3 = req.query.error3;
    // console.log(error1);

    res.render('product/add_product.ejs', { error1 });
};

const postAddProduct = async (req, res) => {
    // Use multer to handle file uploads
    try {
        if (!req.files || !req.files['primary_image']) {
            res.redirect(`/product/add_product/?error1=${encodeURIComponent('Primary Image Required')}`);
        }
        // if (!req.files || !req.files['secondary_image']) {
        //     res.redirect(`/product/add_product/?error2=${encodeURIComponent('Secondary Image Required')}`);
        // }
        // if (!req.files || !req.files['category_image']) {
        //     res.redirect(`/product/add_product/?error3=${encodeURIComponent('category Image  Required')}`);
        // }
        // console.log(req.files);
        let secondaryImages = [];
        if (req.files['secondary_image'] != undefined) {
            for (let i = 0; i < req.files['secondary_image'].length; i++) {
                secondaryImages.push('/front_assets/new_img/' + req.files['secondary_image'][i].filename);
                // let modifiedFileName = req.files['secondary_image'][i].filename.replace(/\s/g, '');
                // secondaryImages.push('/front_assets/new_img/' + modifiedFileName);

            }
            console.log('Adding product');
            console.log(secondaryImages);
        }
        let result = await models.Product.create({
            'name': req.body.name,
            'buying_price': req.body.buying_price,
            'selling_price': req.body.selling_price,
            'discount': req.body.discount,
            'product_category': req.body.product_category,
            'primary_image': '/front_assets/new_img/' + req.files['primary_image'][0].filename,
            'category_image': req.files['category_image'] ? '/front_assets/new_img/' + req.files['category_image'][0].filename : null,
            'secondary_image': JSON.stringify(secondaryImages),
            'description': req.body.description,
            'product_type': req.body.product_type,
            'colorVariants': JSON.stringify(req.body.colorVariants),
            'sizeVariants': JSON.stringify(req.body.sizeVariants),
            'total_qty': req.body.total_qty,
            'product_code': Math.floor(Math.random() * 1000) + 1,
            'old_price': req.body.old_price,
            'date': req.body.date,
            'quantitys': req.body.quantitys,
        });
        // console.log(typeof (result.secondary_image));
        // console.log(result.secondary_image);
        // console.log('ggg');
        // console.log(typeof (JSON.parse(result.secondary_image)));
        // console.log(JSON.parse(result.secondary_image));
        // console.log(typeof (JSON.parse(result.secondary_image)));
        // console.log(result);

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
    let products = await models.Product.findAll();
    let unique_cate = [...new Set(products.map(product => product.product_category).filter(category => category !== ''))];
    // console.log(unique_cate);

    const productId = req.params.id;
    let details_secondary_img = await models.Product.findOne({
        where: {
            id: productId,
        }
    });
    let logo_img = await models.Crm.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
    });

    let reviews = await models.Review.findAll();

    res.render('product/product_details.ejs', { unique_cate, details_secondary_img, reviews, logo_img, locals: { session: req.session } });
}

const postCartProduct = async (req, res) => {
    const { product_id } = req.body;
    //buy now code
    const { buy } = req.body;

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
            id: specific_record.id,
            primary_image: specific_record.primary_image,
            name: specific_record.name,
            quantity: 1,
            selling_price: specific_record.selling_price,
            total_qty: specific_record.buying_price,
            total: specific_record.selling_price
        }
        cart.push(cart_data);
        // Update the session with the modified cart
        req.session.cart = cart;
        // console.log('Cart Items: ', cart);

        //buy now code
        if ((buy) != null) {
            return res.send({
                'record': cart_data,
                'cart': cart,
                'add_on_html': true,
                'buy': true
            });
        }

        return res.send({
            'record': cart_data,
            'cart': cart,
            'add_on_html': true
        });
    } else {
        // console.log('Cart Items: ', cart);
        return res.send({
            'record': specific_record,
            'cart': cart,
            'add_on_html': false
        });
    }

}

const editProduct = async (req, res) => {
    let id = req.params.id;
    let { name, buying_price, selling_price, discount, product_category, description, product_type, total_qty, product_code, date, quantitys } = req.body;
    // let pri_img = req.files['primary_image'][0].filename;
    // let cate_img = req.files['category_image'][0].filename;
    // let second_img= req.files['secondary_image']
    // let sec_img=[];
    // if (second_img) {
    //     sec_img.push('/front_assets'+req.files['secondary_image'].filename);
    // }
    // let result = await models.Product.update({
    //     'name': req.body.name,
    //     'buying_price': req.body.buying_price,
    //     'selling_price': req.body.selling_price,
    //     'discount': req.body.discount,
    //     'product_category': req.body.product_category,
    //     'primary_image': '/front_assets/new_img/' + req.files['primary_image'][0].filename,
    //     'category_image': req.files['category_image'] ? '/front_assets/new_img/' + req.files['category_image'][0].filename : null,
    //     'secondary_image': JSON.stringify(secondaryImages),
    //     'description': req.body.description,
    //     'product_type': req.body.product_type,
    //     'colorVariants': JSON.stringify(req.body.colorVariants),
    //     'sizeVariants': JSON.stringify(req.body.sizeVariants),
    //     'total_qty': req.body.total_qty,
    //     'product_code': Math.floor(Math.random() * 1000) + 1,
    //     'date': req.body.date,
    //     'quantitys': req.body.quantitys,
    // });
    let record = await models.Product.findOne({
        where: {
            'id': id
        }
    });
    // console.log(record);
    res.render('product/edit_product.ejs', { record });
}

const example = async (req, res) => {
    // Use multer to handle file uploads

    try {
        if (!req.files || !req.files['primary_image']) {
            res.redirect(`/product/add_product/?error1=${encodeURIComponent('Primary Image Required')}`);
        }

        if (!req.files || !req.files['secondary_image']) {
            res.redirect(`/product/add_product/?error2=${encodeURIComponent('Secondary Image Required')}`);
        }
        if (!req.files || !req.files['category_image']) {
            res.redirect(`/product/add_product/?error3=${encodeURIComponent('category Image  Required')}`);
        }
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
        // console.log(result);

        res.redirect('/product/Product_list');
    }
    catch (err) {
        console.error('Error creating product:', err);
        // res.status(500).send('Internal Server Error');
    }
}

const postEditProduct = async (req, res) => {

    let baseURL = `${req.protocol}://${req.headers.host}`;
    console.log('Base Url: ', baseURL);

    const { name, buying_price, selling_price, price, discount, product_category, description, product_type, total_qty, deleted_secondary_img, date } = req.body;
    let id = req.params.id;
    let imgs = JSON.parse(deleted_secondary_img);
    console.log('Deleted Img List: ', imgs);

    // try {
    //     imgs.forEach(img => {
    //         imgs = img.trim().replace(/%/g, '');
    //     });
    // }
    // catch (err) {
    //     console.log(err.message);
    // }
    // console.log('cleaned images:', imgs);


    let filteredImages = imgs.map(url => url.replace(baseURL, ""));
    console.log('filtered_deleted images: ', filteredImages);

    let requestedSecImage = [];
    if (req.files['secondary_image'] != undefined) {
        for (let i = 0; i < req.files['secondary_image'].length; i++) {
            // let modifiedFileName = req.files['secondary_image'][i].filename.replace(/\s/g, '');
            // requestedSecImage.push('/front_assets/new_img/' + modifiedFileName);
            requestedSecImage.push('/front_assets/new_img/' + req.files['secondary_image'][i].filename);
        }
    }
    console.log('requested images: ', requestedSecImage);

    JSON.stringify(requestedSecImage);

    const previousRecord = await models.Product.findByPk(id);

    let newSecondaryImages = JSON.parse(previousRecord.secondary_image).filter(image => {
        return !filteredImages.includes(image);
    });
    JSON.stringify(newSecondaryImages);

    console.log(newSecondaryImages);

    let new_arr = newSecondaryImages.concat(requestedSecImage);
    console.log('New Images', new_arr);

    await previousRecord.update({
        'name': name || previousRecord.name,
        'buying_price': buying_price || previousRecord.buying_price,
        'selling_price': selling_price || previousRecord.selling_price,
        'discount': discount || previousRecord.discount,
        'product_category': product_category,
        'primary_image': req.files['primary_image'] && req.files['primary_image'][0] ? '/front_assets/new_img/' + req.files['primary_image'][0].filename : previousRecord.primary_image,
        'secondary_image': JSON.stringify(new_arr) || previousRecord.secondary_image,
        'category_image': req.files['category_image'] && req.files['category_image'][0] ? '/front_assets/new_img/' + req.files['category_image'][0].filename : previousRecord.category_image,
        'description': description || previousRecord.description,
        'product_type': product_type || previousRecord.product_type,
        'colorVariants': null,
        'sizeVariants': null,
        'total_qty': total_qty || previousRecord.total_qty,
        'product_code': Math.floor(Math.random() * 1000) + 1,
        'date': date || previousRecord.date,
        'quantitys': null,
    });

    // console.log(previousRecord);

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