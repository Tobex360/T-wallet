const express = require('express');
const AuthUcontroller = require('../controllers/authUcontroller');

const router = express.Router();

router.post('/uregister', AuthUcontroller.registerUser);
router.post('/ulogin', AuthUcontroller.loginUser);
router.post('/google-login', AuthUcontroller.googleLogin);





module.exports = router;