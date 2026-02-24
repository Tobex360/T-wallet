const Product = require("../models/products");
const mongoose = require('mongoose');



async function createProduct(req,res){
    try{
        const { name, description, price, stock, status } = req.body;

        const newProduct = new Product ({
            name,
            description,
            price,
            stock,
            status,
            image: req.file ? req.file.path : null // Save file path
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(500).json({ message: error.message });
    }

}

async function getProducts(req,res){
    try{
        const products = await Product.find();
        res.json(products)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
}

async function updateProduct(req, res){
    try{
        const { id } = req.params;
        const { name, description, price, stock, status } = req.body;

        const updateData = {
            name,
            description,
            price,
            stock,
            status,
        };

        // Only update image if a new file is provided
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function deleteProduct(req, res){
    try{
        const { id } = req.params;
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const ProductController = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}

module.exports = ProductController;
