const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    count: Number,
    user_id: {
        type: String,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    products:{type:Array},
    transaction_id: String,
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Received",
        enum: ["Received", "Dispatched", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = { Order, ProductCart }