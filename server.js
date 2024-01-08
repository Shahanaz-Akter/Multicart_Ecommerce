
// This is Our main or server file where all of the file will be included

//npm/nodemon run server ->for entry point

//npm install express
// npm install nodemon --save-dev ->nodemon
//npm install --save body-parser  for getting requested value from the user end

//npm init -y or npm init->package.json  // initialize a new Node.js project using npm init
//npm install ->package-lock.json
//npm install express ejs express-ejs-layouts 
//npm install multer for uploading image on node js with any database

//npm install mongodb
//node modules command->npm i express dotenv mongoose colors

// npm i express-async-handler -> for getting async facility package

//npm install ejs ---> integrate the templating engine into your project.

//npm install express-session------>for getting and storing session
//npm install fs

//npm install --save sequelize for talking database
//npm install --g sequelize cli globally installed in your node js project 
// after using this command have to add this piece of code in package.json file
// "scripts": {
//     "sequelize": "sequelize"
//   }" 

//npm install --g sequelize cli
//npm run sequelize init for creating mode, migrations, config and seeds folder

//creating model with migrtaions structure
// sequelize model:generate --name User --attributes  user_name:string,role:string,password:string
//sequelize db:migrate connect to the db migrate 

// sequelize db:migrate:undo (last migrate file will be removed only) or sequelize db:migrate:undo --name migration-file-name
//sequelize db:migrate:undo:all all will be undo
// sequelize db:migrate:undo --name 20240101064209-create-customer.js  specific undo migrate

//sequelize migration:generate --name add-extra-field-to-customer add one field in db and i need to manually replace the models fields name

//control + c for stop server

//created Express application npm install express install nodemon  using express() and assign it to the app variable.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const multer=require('multer');



// const upload=multer({storage:storage});

// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);

const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000; //if env port is not working then work 5000 port

//From postman or view form for showing  of the requested value need to use this couple of this code 
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


// Parse application/json
// app.use(bodyParser.json());

const path = require('path'); //for keeping all views and image sources path
app.use(express.static('public'));
//set public as a default folder

//using this parser enable to get requseted value
// app.use(bodyParser.json()); 
// Set view engine to EJS  
app.set('View engine', 'ejs');

// try to connect node js and mysql 
//if I want to bring some folder or file have to module. exports than get using require('') method

//Creating Multiple Routes with prefix
const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

app.use('/super_admin', require('./routes/superAdminRoute'));
app.use('/product', require('./routes/productRoute'));
app.use('/expense', require('./routes/expenseRoute'));
app.use('/customer', require('./routes/customerRoute'));
app.use('/report', require('./routes/reportRoute'));
// app.use('/admin', require('./routes/adminRoute'));

// const connectDB = require('./db_config/db');
// connectDB();

//server starting at the end of the project
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});