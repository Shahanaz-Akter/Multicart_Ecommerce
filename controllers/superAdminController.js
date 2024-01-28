const asyncHandler = require('express-async-handler');
const upload = require('../multer');
const models = require('../models');

const dashboard = (req, res) => {
    res.render('layouts/master.ejs');
}
const Super = (req, res) => {
    res.render('user/super_admin.ejs');
}
const addProduct = (req, res) => {
    res.render('product/add_product.ejs');
}
const ProductList = (req, res) => {
    res.render('product/Product_list.ejs');
}
const productCategory = (req, res) => {
    res.render('product/category.ejs');
}

const addExpense = (req, res) => {
    res.render('expense/add_expense.ejs');
}
const expenseList = (req, res) => {
    res.render('expense/expense_list.ejs');
}

const addCustomer = (req, res) => {
    res.render('customer/add_customer.ejs');
}
const customerList = (req, res) => {
    res.render('customer/customer_list.ejs');
}
const productReport = (req, res) => {
    res.render('report/product_report.ejs');
}
const expenseReport = (req, res) => {
    res.render('report/expense_report.ejs');
}
const customerReport = (req, res) => {
    res.render('report/customer_report.ejs');
}

const addLogo = async (req, res) => {
    // let record = await models.Crm.findAll();
    let record = await models.Crm.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
    });
    // console.log('hi', record);
    res.render('logo/add_logo.ejs', { record });
}
const addBanner = async (req, res) => {
    let banner = await models.Crm.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
    });

    // console.log('Banner: ', banner);
    // console.log(banner.banner_image);

    // let bannerImageArray = [];

    // if (banner && banner.banner_image) {
    //     try {
    //         bannerImageArray = JSON.parse(banner.banner_image);

    //     } catch (error) {
    //         console.error('Error parsing banner_image:', error);
    //     }
    // }

    // let banner = await models.Crm.findOne();

    res.render('banner/add_banner.ejs', { banner });
}
const postAddLogo = async (req, res) => {
    try {
        // console.log(req.files['logo_image'][0].filename);

        // Check if there are any records in the Crm table
        const existingData = await models.Crm.findAll();
        if (existingData.length === 0) {
            // If no records exist, create a new record
            let data = await models.Crm.create({
                'logo_image': '/front_assets/new_img/' + req.files['logo_image'][0].filename,
            });
            res.redirect('/super_admin/add_logo');
        } else {
            // If records exist, update the first record
            let data = await models.Crm.update({
                'logo_image': '/front_assets/new_img/' + req.files['logo_image'][0].filename,
            }, {
                where: {
                    id: existingData[0].id
                }
            });
            res.redirect('/super_admin/add_logo');
        }

    } catch (err) {
        console.log(err);
    }
};

const postAddBanner = async (req, res) => {
    try {

        let sliderImages = req.files['banner_image'].map(file => '/front_assets/new_img/' + file.filename);
        // Find the first record, if it exists
        let existingData = await models.Crm.findOne();

        if (!existingData) {
            // If no records exist, create a new record
            await models.Crm.create({
                'banner_image': JSON.stringify(sliderImages)
            });
            // console.log(sliderImages);

            // console.log(JSON.stringify(sliderImages));

        } else {
            // If records exist, update the first record
            await models.Crm.update({
                'banner_image': JSON.stringify(sliderImages)
            }, {
                where: {
                    id: existingData.id
                }
            });
        }
        // Redirect after the operation
        res.redirect('/super_admin/add_banner');
    } catch (err) {
        console.error(err);
        // Handle errors appropriately, e.g., res.status(500).send('Internal Server Error');
    }
};


module.exports = { postAddLogo, postAddBanner, Super, dashboard, addProduct, ProductList, productCategory, addExpense, expenseList, addCustomer, customerList, productReport, expenseReport, customerReport, addLogo, addBanner }