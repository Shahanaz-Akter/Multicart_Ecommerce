const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

router.get('/', login);
router.get('/register', register);
router.get('/login', login);


module.exports = router;