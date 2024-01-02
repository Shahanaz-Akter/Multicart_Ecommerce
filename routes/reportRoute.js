const express = require('express');
const router = express.Router();

const { productReport } = require('../controllers/reportController');

router.get('/product_report', productReport);

module.exports = router;