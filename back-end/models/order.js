const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    product_name:{
        type:String,
        required:true
    }
})

const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Received", "Dispatched", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = { Order, ProductCart }