const Product = require('../models/product');

exports.getProductrById = async (req, res, next, id) => {
    try {
        const result = await Product.findOne({ _id: id }).populate('category', 'name');
        if (!result) {
            return (
                res.status(400).json({
                    message: 'Product Not Found'
                })
            );
        }
        req.product = result;
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Product Not Found'
            })
        );
    }
}

exports.createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        return (
            res.status(200).json({
                message: 'Successfully addedd Product'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to add Product in DB'
            })
        );
    }
}

exports.getProduct = (req, res) => {
    return (
        res.status(200).json(req.product)
    );
}

exports.getAllProducts = async (req, res) => {
    try {
        const result = await Product.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }).populate('category', '-_id name');
        if (result.length == 0) {
            return (
                res.status(400).json({
                    message: 'No Products Found'
                })
            );
        }
        return (
            res.status(200).json(result)
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'No Products Found'
            })
        );
    }
}

exports.updateProduct = async (req, res) => {
    try {
        await Product.updateOne({ _id: req.product._id }, { $set: req.body });
        return (
            res.status(200).json({
                message: 'Successfully Updated the Product'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to Update the Product'
            })
        );
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.product._id });
        return (
            res.status(200).json({
                message: 'Successfully deleted the Product'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to Delete the Product'
            })
        );
    }
}

//Middleware TODO
exports.updateStockAndSold = async (req, res, next) => {

}