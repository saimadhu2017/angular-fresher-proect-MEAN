const Category = require('../models/category');

exports.getCategoryById = async (req, res, next, id) => {
    try {
        const result = await Category.findOne({ _id: id });
        if (!result) {
            return (
                res.status(400).json({
                    message: 'No CategoryID found'
                })
            );
        }
        req.category = result;
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Error in fetching the category data'
            })
        );
    }
}

exports.createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        return (
            res.status(200).json({
                message: 'Successfully Created a new Category'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to Create a new Category'
            })
        );
    }
}

exports.getCategory = (req, res) => {
    return (
        res.status(200).json(req.category)
    );
}

exports.getAllCategories = async (req, res) => {
    try {
        const result = await Category.find();
        if (result.length == 0) {
            return (
                res.status(400).json({
                    message: 'No categories found'
                })
            );
        }
        return (res.status(200).json(result));
    } catch (error) {
        return (
            res.status(400).json({
                message: 'No categories found'
            })
        );
    }
}

exports.updateCategory = async (req, res) => {
    try {
        await Category.updateOne({ name: req.category.name }, { $set: { name: req.body.name } });
        return (
            res.status(200).json({
                message: 'Successfully Updated the category'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to Update Category'
            })
        );
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({ name: req.category.name });
        return (
            res.status(200).json({
                message: 'successfully deleted the Category'
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to delete the Category'
            })
        );
    }
}