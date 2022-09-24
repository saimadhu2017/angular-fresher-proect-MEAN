const User = require('../models/user');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
    try {
        const { name, email, _id } = await User.create(req.body);
        return (
            res.status(200).json({
                message: 'Successfully Signed Up',
                data: { name: name, email: email, id: _id }
            })
        );
    } catch (error) {
        return (
            res.status(400).json({
                message: 'Failed to Sign Up'
            })
        );
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await User.findOne({ email: email });
        if (!result) {
            return (
                res.status(400).json({
                    message: 'Invalid email id'
                })
            );
        }
        else if (!result.authenticate(password)) {
            return (
                res.status(400).json({
                    message: 'Invalid password'
                })
            );
        }

        var token = jwt.sign({ _id: result._id }, process.env.SECRET,{expiresIn:3600});
        res.cookie('token', token, { expires: new Date(), maxAge: 3600000 });

        return (
            res.status(200).json({
                token: token,
                user: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                }
            })
        );

    } catch (error) {
        return (
            res.status(400).json({
                message: 'Invalid credentials'
            })
        );
    }
}

//TODO: REMOVE token when signout triggers
exports.signout = async (req, res) => {
    res.clearCookie('token');
    return (
        res.status(200).json({
            message: 'successfully signed out'
        })
    );
}

//Protected Middleware builtin
exports.isSignedin=expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
    userProperty:'auth'
})

//Custom Made Middlewares
exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return(
            res.status(403).json({
                message:'ACCESS DENIED'
            })
        );
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return(
            res.status(403).json({
                message:'You are not Admin, ACCESS DENIED'
            })
        );
    }
    next();
}