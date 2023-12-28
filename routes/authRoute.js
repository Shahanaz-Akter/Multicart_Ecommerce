const express = require('express');
const router = express.Router();

const { register, dashboard, } = require('../controllers/authController');

router.get('/', register);
router.get('/register', register);
router.get('/dashboard', dashboard);



// route.post();
module.exports = router;