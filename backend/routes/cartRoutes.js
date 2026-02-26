const express = require('express');
const cartController = require('../controllers/cartController');


const router = express.Router();

router.get('/get/:userId', cartController.getCart)
router.post('/add', cartController.addCart)
router.put('/update', cartController.updateCart)
router.delete('/remove', cartController.removeCart)
router.delete('/clear/:userId', cartController.clearCart)


module.exports= router;