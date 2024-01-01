// connect node js with mysql databse
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'multicart_ecommerce',
});

connection.connect((err) => {

    // connection.query('CREATE DATABASE fgfd', (err) => {
    //     if (err) throw new Error(err);
    //     console.log('Created successfully');

    // });

    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;




