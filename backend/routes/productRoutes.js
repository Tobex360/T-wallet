const express = require('express');
const ProductController = require('../controllers/productController');
const upload = require('../config/upload');

const router = express.Router();

router.post('/create', upload.single('image'), ProductController.createProduct);
router.get('/getproducts', ProductController.getProducts);
router.put('/update/:id', upload.single('image'), ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports= router;