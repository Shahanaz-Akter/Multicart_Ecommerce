const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const addOrder = async (req, res) => {
    // console.log('add order');
    let items = await models.Product.findAll();
    // console.log(items);
    res.render('order/add_order.ejs', { items });
}

const postAddOrder = async (req, res) => {
    let { name, mobile, birth, email, country, address, zip_code, date, mobile1, customer_name1, delivery_charge, address1, discount } = req.body;
    let product_list = req.body.products;
    console.log((req.body.products));
    // console.log((req.body.qty));
    let qty_arr = req.body.qty;

    let sub_total = 0;
    let arr1 = [];

    product_list.forEach((e, index) => {
        let ele = JSON.parse(e);
        sub_total += ele.selling_price * parseInt(qty_arr[index]);
        arr1.push(ele);
    });
    // Filter and map the product information
    let arr2 = arr1.map((element, index) => {
        return {
            id: element.id,
            // name: element.name,
            primary_image: element.primary_image,
            selling_price: element.selling_price,
            total_qty: qty_arr[index]
        };
    });
    // console.log(arr2);
    let data = {
        'customer_name': name,
        'mobile': mobile,
        'dob': birth,
        'email': email,
        'country': country,
        'address': address,
        'zip_code': zip_code,
        'date': date,

        'products': arr2,
        'mobile1': mobile1,
        'customer_name1': customer_name1,
        'delivery_charge': delivery_charge,
        'address1': address1,
        'sub_total': sub_total,

        'discount': discount,
    };
    try {
        let customer = await models.Customer.create({
            'customer_name': name,
            'mobile': mobile,
            'dob': birth,
            'email': email,
            'country': country,
            'address': address,
            'zip_code': zip_code,
            'customer_id': Math.floor(Math.random() * 100) + 1,
            'date': date,
            'otp_num': 1234,
        });

        let order = await models.Order.create({
            'mobile': mobile1,
            'address': address1,
            'delivery_charge': delivery_charge,
            'products': JSON.stringify(arr2), //JSON.stringify(Products)
            'sub_total': sub_total,
            'total': null,
            'total_amount': sub_total + parseInt(delivery_charge),
            'discount': discount,
            'status': null,
        });

        if (true) {
            res.redirect('/order/order_list');
        }
    }

    catch (err) {
        console.log(err);
    }
}

const orderList = async (req, res) => {
    // console.log('order list');
    try {
        let orders = await models.Order.findAll();
        // console.log(products);
        res.render('order/order_list.ejs', { orders });
    }
    catch (error) {
        res.status(500).send('Internal Server Error', error);
    }
}
const editOrder = async (req, res) => {

    res.redirect('/order/order_list');
    // console.log('edit');
}

const deleteOrder = async (req, res) => {
    // res.render('product/edit_product.ejs');
    let id = req.params.id;
    let record = await models.Order.findOne({
        where: {
            'id': id
        }
    });
    await record.destroy();
    res.redirect('/order/order_list');
}

const statusChange = async (req, res) => {
    // res.render('product/edit_product.ejs');
    let { id, val } = req.body;
    try {
        let record = await models.Order.findOne({
            where: {
                'id': id
            }
        });
        if (record != null) {
            // console.log(record);
            await record.update({ status: val });
            console.log('Record updated successfully');
        }
        else {
            console.log('Record not found');
        }

    }
    catch (err) {
        console.log(err);

    }

    return res.send({
        'success': true,
        'status': 'okay'
    });
}


module.exports = { addOrder, postAddOrder, orderList, editOrder, deleteOrder, statusChange }
