const Cart = require("../models/cart");
const mongoose = require('mongoose');


async function getCart(req,res){
    try{
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');

        if (!cart) {
            return res.json({ items: [] });
        }
        res.json(cart);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

async function addCart(req,res){
    console.log("REQ BODY:", req.body);
    try{
        const{ userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!userId) {
        return res.status(400).json({ message: "User not logged in" });
        }

        if(!cart) {
            // Create new Cart
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // check if product already in cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1){
                // Update quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Add new item
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('items.productId');
        res.json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateCart(req,res){
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(404).json({ message: 'cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            if(quantity <= 0) {
                //Remove item if quantity is 0
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity =quantity;
            }
        }
        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('items.productId');
        res.json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
}

async function removeCart(req,res){
    try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function clearCart(req,res){
    try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const cartController = {
    getCart,
    addCart,
    removeCart,
    updateCart,
    clearCart,
}

module.exports = cartController;
