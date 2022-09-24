const express = require('express');
const router = express.Router();

const { pushOrderInPurchaseList } = require('../controllers/user');
const { getUserById } = require('../controllers/user');
const { isSignedin, isAuthenticated } = require('../controllers/auth');
const { addProductInCart, getProductsInCartByUserId, updateProductInCartByUserId, deleteProductInCartByUserId, productInCartByUserId, createOrder, getOrder, getProductsInCartByUserIdLength } = require('../controllers/order');

router.param('userId', getUserById)

//CART Routes

//Add a product in cart
router.post('/product/cart/:userId', isSignedin, isAuthenticated, addProductInCart);

//get user cart
router.get('/product/cart/:userId', isSignedin, isAuthenticated, getProductsInCartByUserId);
router.get('/product/cart/length/:userId', isSignedin, isAuthenticated, getProductsInCartByUserIdLength);

//update user cart
router.put('/product/cart/update/:userId', isSignedin, isAuthenticated, updateProductInCartByUserId);

//delete user cart
router.delete('/product/cart/:userId/:id', isSignedin, isAuthenticated, deleteProductInCartByUserId);


//ORDER Routes
//create order
router.post('/order/:userId', isSignedin, isAuthenticated, productInCartByUserId, pushOrderInPurchaseList, createOrder);

//get orders by user id
router.get('/orders/:userId', isSignedin, isAuthenticated, getOrder);

module.exports = router;