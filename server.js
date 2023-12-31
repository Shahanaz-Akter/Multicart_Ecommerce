
// This is Our main or server file where all of the file will be included

//npm/nodemon run server ->for entry point

//npm install express

// npm install nodemon --save-dev ->nodemon

//npm init -y or npm init->package.json  // initialize a new Node.js project using npm init
//npm install ->package-lock.json
//npm install express ejs express-ejs-layouts 

//npm install mongodb
//node modules command->npm i express dotenv mongoose colors

// npm i express-async-handler -> for getting async facility package

//npm install ejs ---> integrate the templating engine into your project.

//npm install express-session------>for getting and storing session

//control + c for stop server

//created Express application npm install express install nodemon  using express() and assign it to the app variable.
const express = require('express');
const app = express();

// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);

const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000; //if env port is not working then work 5000 port

//From postman or view form for showing body of the requested value need to use this couple of this code
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const path = require('path'); //for keeping all views
app.use(express.static('public'));
//set public as a default folder

// Set view engine to EJS
app.set('View engine', 'ejs');

// try to connect node js and mysql 
//if I want to bring some folder or file have to module. exports than get using require('') method

//Creating Multiple Routes with prefix
// app.use('/customer', require('./routes/customerRoute'));


app.use('/', require('./routes/authRoute'));
app.use('/super_admin', require('./routes/superAdminRoute'));

// app.use('/product', require('./routes/productRoute'));
// app.use('/expense', require('./routes/expenseRoute'));
// app.use('/people', require('./routes/peopleRoute'));
// app.use('/customer', require('./routes/customerRoute'));
// app.use('/report', require('./routes/reportRoute'));

const connectDB = require('./config/db');
// connectDB();

//server starting at the end of the project
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});