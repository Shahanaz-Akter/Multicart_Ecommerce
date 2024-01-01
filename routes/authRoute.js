const express = require('express');
const router = express.Router();

const { register, login, postRegister } = require('../controllers/authController');

router.get('/', login);
router.get('/login', login);
router.get('/register', register);
router.post('/post_register', postRegister);

module.exports = router;