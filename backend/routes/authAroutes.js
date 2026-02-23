const express = require('express');
const AuthAcontroller = require('../controllers/authAcontroller');

const router = express.Router();

router.post('/aregister', AuthAcontroller.registerAdmin);
router.post('/alogin', AuthAcontroller.loginAdmin);




module.exports = router;