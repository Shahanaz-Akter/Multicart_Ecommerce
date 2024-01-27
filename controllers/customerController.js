const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');
// const axios = require('axios');
var requests = require('request');


const addCustomer = async (req, res) => {
    res.render('customer/add_customer.ejs');
}

const postCustomer = async (req, res) => {

    try {
        const { customer_name, mobile, dob, email, country, address, zip_code, date, } = req.body;
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
            'otp_num': Math.floor(Math.random() * 10000) + 1,
        });

        if (result) {
            console.log('successfully Stored: ');
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

const postRegisterCustomer = async (req, res) => {
    try {
        const { customer_name, mobile, dob, email, country, address, zip_code, date } = req.body;

        // Generate OTP
        const newOtp = Math.floor(Math.random() * (9999 - 1234 + 1) + 1234);
        // Send OTP via SMS
        const smsApiUrl = 'https://api.sms.net.bd/sendsms';
        const smsApiKey = '0k4pEM8Atavv3W1c5af3vEYUB99j9kCZ5rYb84ZE';


        // Need to use this 3 line code for sending otp to the requested number
        // var options = {
        //     'method': 'POST',
        //     'url': smsApiUrl,
        //     formData: {
        //         'api_key': smsApiKey,
        //         msg: `Your Ztrios OTP Number: ${newOtp}`,
        //         to: mobile,
        //     }
        // };

        // requests(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        // });

        // console.log('SMS API Response:', options.data);


        // Save customer data to the database
        const result = await models.Customer.create({
            // ... other fields ...
            'customer_name': customer_name,
            'mobile': mobile,
            'dob': dob,
            'email': email,
            'country': country,
            'address': address,
            'zip_code': zip_code,
            'customer_id': Math.floor(Math.random() * 100) + 1,
            'date': date,
            'otp_num': newOtp,
        });

        // Get the customer ID
        const id = result.id;

        if (result) {
            // Render the OTP verification page
            res.redirect(`/customer/customer_otp/${id}`);
            // res.render('user/customer_otp.ejs', { id });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const customerOtp = async (req, res) => {
    let id = req.params.id;
    let error = req.query.error;

    let user = await models.Customer.findOne({ where: { id: id } });

    // Extracting the first 2 digits
    const firstTwoDigits = user.mobile.substring(0, 2);

    // Extracting the last 3 digits
    const lastThreeDigits = user.mobile.substring(8, 11);

    const num = "+88" + firstTwoDigits + "****** " + lastThreeDigits;

    res.render('user/customer_otp.ejs', { id: id, error: error, num: num });

}


const postOtp = async (req, res) => {
    const { otp_num } = req.body;
    let db_exist_id = req.params.id;
    let record = await models.Customer.findOne({ where: { id: db_exist_id } });
    console.log('params id', db_exist_id);
    console.log('record:', record);

    if (record.otp_num == otp_num) {
        res.redirect('/');
    }
    else {
        let errorMsg = encodeURIComponent("Invalid OTP Number");
        let id = record.id;
        res.redirect(`/customer/customer_otp/${id}?error=${errorMsg}`);

    }
};


module.exports = { addCustomer, postCustomer, customerList, postRegisterCustomer, customerOtp, postOtp }