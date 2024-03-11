const express = require('express');
const router = express.Router();
const models = require('../models');

const { register, login, postLogin, postRegister, postForgetPassword, changePassword, postChangePassword, facebook, google, facebookCallback, googleCallback } = require('../controllers/authController');

router.get('/dashboard', login);
router.get('/register', register);
router.post('/post_register', postRegister);

router.get('/login', login);
router.post('/post_login', postLogin);

router.post('/post_forget_password', postForgetPassword);
router.get('/change_password/:id', changePassword);
router.post('/post_change_password/:id', postChangePassword);

// authentication api route start
// router.get("/facebook/login", facebook);
// router.get("/facebook/callback", facebookCallback, async (req, res) => {
//     try {
//         let user = req.session.passport.user;
//         let user1 = await models.Customer.findOne({ email: user.emails[0].value });


//         if (user1) {
//             res.redirect('/');
//         }
//         else {
//             let msg = encodeURIComponent('Invalid User');
//             res.redirect(`/login/?error=${msg}`);
//         }


//     } catch (e) {
//         console.log(e.message);
//         // res.redirect("/auth/login");
//     }
// });

// router.get("/google/login", google);
// router.get("/google/callback", googleCallback, async (req, res) => {
//     try {
//         let user = req.session.passport.user;
//         console.log(user);
//         let user1 = await models.Customer.findOne({ email: user.emails[0].value });

//         if (user1) {
//             res.redirect('/');
//         }
//         else {
//             let msg = encodeURIComponent('Invalid User');
//             res.redirect(`/login/?error=${msg}`);
//         }



//     } catch (err) {
//         console.log(err.message);
//         // res.redirect("/auth/login"); // Handle errors by redirecting to the login page
//     }
// });
// authentication api route end


// authentication api route start
router.get("/facebook", facebook);
router.get("/facebook/callback", facebookCallback, async (req, res) => {
    try {
        let user = req.session.passport.user;
        if (user) {
            let user1 = await models.Customer.findOne({ where: { email: user.emails[0].value } });
            if (user1) {
                res.redirect('/');
            }
            else {
                let currentDate = new Date(); // Get current date and time

                let result = await models.Customer.create({
                    'customer_name': user.displayName,
                    'mobile': '',
                    'dob': '',
                    'email': user.emails[0].value,
                    'country': '',
                    'address': '',
                    'zip_code': '',
                    'customer_id': Math.floor(Math.random() * 100) + 1,
                    'date': currentDate.toISOString(),
                    'otp_num': Math.floor(Math.random() * 10000) + 1,
                });
                // console.log(result);
                res.redirect('/');
            }
        }
    } catch (e) {
        console.log(e.message);
        // res.redirect("/auth/login");
    }
});

router.get("/google", google);
router.get("/google/callback", googleCallback, async (req, res) => {
    try {
        let user = req.session.passport.user;
        console.log(user.emails[0].value);
        if (user) {
            let user1 = await models.Customer.findOne({ where: { email: user.emails[0].value } });
            console.log(user1);

            if (user1) {
                res.redirect('/');
            }
            else {
                let currentDate = new Date(); // Get current date and time

                let result = await models.Customer.create({
                    'customer_name': user.displayName,
                    'mobile': '',
                    'dob': '',
                    'email': user.emails[0].value,
                    'country': '',
                    'address': '',
                    'zip_code': '',
                    'customer_id': Math.floor(Math.random() * 100) + 1,
                    'date': currentDate.toISOString(),
                    'otp_num': Math.floor(Math.random() * 10000) + 1,
                });
                // console.log(result);
                res.redirect('/');
            }
        }

    } catch (err) {
        console.log(err.message);
        // res.redirect("/auth/login"); // Handle errors by redirecting to the login page
    }
});
// authentication api route end

module.exports = router;