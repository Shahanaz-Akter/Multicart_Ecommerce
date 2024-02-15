const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const addOrder = async (req, res) => {
    // console.log('add order');
    let items = await models.Product.findAll();
    // console.log(items);
    res.render('order/add_order.ejs', { items });
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


module.exports = { addOrder, orderList, editOrder, deleteOrder, statusChange }
