const { Order, ProductCart } = require('../models/order');
const Product = require('../models/product');

//CART Handlers

exports.addProductInCart = async (req, res) => {
    try {
        const { count, product } = req.body;
        const result = await Product.findOne({ _id: product }, { _id: 0, name: 1 });
        await ProductCart.create({ user: req.profile._id, count: count, product: product, product_name: result.name });
        res.status(200).json({
            message: "Sucessfully added the Product In the Cart"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Add Product In Cart try again"
        })
    }
}

exports.getProductsInCartByUserId = async (req, res) => {
    try {
        const result = await ProductCart.find({ user: req.profile._id }, { user: 0, __v: 0 }).populate('product', 'name description price');
        res.status(200).json({
            cart: result
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to get Products In the Cart by userID"
        })
    }
}

exports.getProductsInCartByUserIdLength = async (req, res) => {
    try {
        const result = await ProductCart.find({ user: req.profile._id }, { user: 0, __v: 0 }).populate('product', 'name description price');
        res.status(200).json({
            cartLength: result.length
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to get Products In the Cart Length by userID"
        })
    }
}

exports.updateProductInCartByUserId = async (req, res) => {
    try {
        await ProductCart.updateOne({
            $and: [
                { user: req.profile._id },
                { product: req.body.product }
            ]
        }, { $set: { count: req.body.count } });
        res.status(200).json({
            message: "Successfully Updated"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Update Product In the Cart by userID"
        })
    }
}

exports.deleteProductInCartByUserId = async (req, res) => {
    try {
        await ProductCart.deleteOne({ _id: req.params.id })
        res.status(200).json({
            message: "Successfully Deleted"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Delete Products In the Cart by userID"
        })
    }
}

//Order Handlers
exports.createOrder = async (req, res) => {
    try {
        const { transaction_id, address } = req.body;
        let sum = 0;
        for (let v of req.productInCart) {
            sum = sum + (v.product.price) * (v.count);
            await Product.updateOne({ _id: v.product._id }, { $inc: { sold: v.count, inStock: -v.count } });
        }
        await Order.create({ products: req.productInCart, amount: sum, transaction_id: transaction_id, address: address, user: req.profile._id });
        await ProductCart.deleteMany({ user: req.profile._id });
        res.status(200).json({
            message: "Successfully Created Order"
        })
    } catch (error) {
        res.status(400).json({
            message: "Failed to Create Order Try again"
        })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const result = await Order.find({ user: req.profile._id });
        return (
            res.status(200).json({
                orders: result
            })
        );
    } catch (error) {
        res.status(400).json({
            message: "No orders to Fetch for the given user"
        })
    }
}

//Order middleware
exports.productInCartByUserId = async (req, res, next) => {
    try {
        const result = await ProductCart.find({ user: req.profile._id }).populate('product', 'name description price');
        if (result.length == 0) {
            return (
                res.status(400).json({
                    message: "No Products added to Cart. So, please add products to cart first"
                })
            );
        }
        req.productInCart = result;
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: "No Products added to Cart. So, please add products to cart first"
            })
        );
    }
}