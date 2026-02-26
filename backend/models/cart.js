const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartItemSchema = new Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min:1,
        default:1,
    }
});

const cartSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [cartItemSchema],

},{
     timestamps: true // Automatically adds createdAt and updatedAt
});



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

