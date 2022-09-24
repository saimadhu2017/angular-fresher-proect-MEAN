const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32
    },
    inStock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);