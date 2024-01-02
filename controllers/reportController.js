const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const models = require('../models');

const productReport = async (req, res) => {
    res.render('report/product_report.ejs');
}


module.exports = { productReport, }