const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    },
    status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
    },
    image:{
        type:String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;