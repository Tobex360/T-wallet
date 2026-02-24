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

const ProductController = {
    createProduct,
    getProducts,
}

module.exports = ProductController;
