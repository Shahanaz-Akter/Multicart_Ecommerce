const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

const addCustomer = async (req, res) => {
    res.render('customer/add_customer.ejs');
}

const postCustomer = async (req, res) => {

    try {
        const { customer_name, mobile, dob, email, country, address, zip_code, date } = req.body;
        let result = await models.Customer.create({
            'customer_name': customer_name,
            'mobile': mobile,
            'dob': dob,
            'email': email,
            'country': country,
            'address': address,
            'zip_code': zip_code,
            'customer_id': Math.floor(Math.random() * 100) + 1,
            'date': date,
        });

        if (result) {
            console.log('successfully Stored: ', result);
        }

        else {
            console.log('something went wrong in db');
        }

        res.redirect('/customer/customer_list');
    }

    catch (err) {
        console.log(err);
    }


}

const customerList = async (req, res) => {

    let customers = await models.Customer.findAll();
    res.render('customer/customer_list.ejs', { customers });
}


module.exports = { addCustomer, postCustomer, customerList }