const express = require('express');
const router = express.Router();

const { getProductrById, createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/product');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//params
router.param('userId', getUserById);
router.param('productId', getProductrById);

//create
router.post('/product/create/:userId', isSignedin, isAuthenticated, isAdmin, createProduct);

//read
router.get('/product/:productId', getProduct);
router.get('/products', getAllProducts);

//update
router.put('/product/:userId/:productId', isSignedin, isAuthenticated, isAdmin, updateProduct);

//delete
router.delete('/product/:userId/:productId', isSignedin, isAuthenticated, isAdmin, deleteProduct);

module.exports = router;