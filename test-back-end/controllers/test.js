const Product = require('../models/product')
const { Order, ProductCart } = require('../models/order')

exports.addProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.status(200).json({
            message: "Sucessfully added the Product"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Add Product"
        })
    }
}

exports.addProductInCart = async (req, res) => {
    try {
        await ProductCart.create(req.body);
        res.status(200).json({
            message: "Sucessfully added the ProductInCart"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Add ProductInCart"
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.productId })
        res.status(200).json({
            result: result
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to get Product"
        })
    }
}

exports.getProductInCartByUserId = async (req, res) => {
    try {
        const result = await ProductCart.find({ user_id: req.params.userId }).populate('product', 'name price');
        res.status(200).json({
            result: result
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to get ProductInCart by userID"
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { transaction_id, address, user_id } = req.body;
        let sum = 0;
        for (let v of req.productInCart) {
            sum = sum + v.product.price;
        }
        await Order.create({ products: req.productInCart, amount: sum, transaction_id: transaction_id, address: address, user_id: user_id });
        res.status(200).json({
            message: "Successfully Created Order"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

//middleware
exports.productInCartByUserId = async (req, res, next) => {
    try {
        const result = await ProductCart.find({ user_id: req.params.userId }).populate('product', 'name price');
        if(result.length==0){
            return (
                res.status(400).json({
                    message: "Failed to get ProductInCart by userID"
                })
            ); 
        }
        req.productInCart = result;
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: "Failed to get ProductInCart by userID"
            })
        );
    }
}