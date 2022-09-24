const User = require('../models/user');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

exports.getUserById = async (req, res, next, id) => {
    try {
        const result = await User.findOne({ _id: id }, { _id: 1, name: 1, email: 1, role: 1, purchases: 1 });
        if (!result) {
            return (
                res.status(400).json({
                    message: 'No User Found'
                })
            );
        }
        req.profile = result;
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: 'No User Found'
            })
        );
    }
}

exports.getUser = (req, res) => {
    return (
        res.status(200).json(req.profile)
    );
}

exports.updateUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let salt = uuidv4();
        let encry_password = securePassword(password, salt);
        if(!encry_password){salt=undefined}
        let userUpdateDetails = {
            name: name,
            email: email,
            salt: salt,
            encry_password: encry_password
        }
        await User.findOneAndUpdate({ _id: req.profile._id }, userUpdateDetails, { runValidators: true });
        return (
            res.status(200).json({
                message: "Successfully Updated.."
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Cannot Update the user details try again..'
            })
        );
    }
}

//Middleware
exports.pushOrderInPurchaseList = async (req, res, next) => {
    try {
        let purchases = [];
        for (let v of req.productInCart) {
            purchases.push({
                _id: v.product._id,
                name: v.product.name,
                description: v.product.description,
                quantity: v.count,
                amount: v.product.price,
                transaction_id: req.body.transaction_id
            })
        }
        await User.updateOne({ _id: req.profile._id }, { $push: { purchases: purchases } });
        next();
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Unale to Save Purchase List in User Profile'
            })
        );
    }
}

function securePassword(plainPassword, salt) {
    if (!plainPassword) { return (undefined); }
    try {
        return (
            crypto.createHmac('sha256', salt).update(plainPassword).digest('hex')
        );
    } catch (error) {
        return (undefined);
    }
}