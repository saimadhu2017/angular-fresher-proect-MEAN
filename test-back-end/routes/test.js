const express=require('express');
const router=express.Router();
const {addProduct,addProductInCart,getProduct,getProductInCartByUserId,productInCartByUserId,createOrder}=require('../controllers/test')

//creating a product
// router.post('/product',addProduct);
//creating a product in cart
// router.post('/productincart',addProductInCart);
//createing a Order
// router.post('/order/:userId',productInCartByUserId,createOrder);

//get a Product by product id
// router.get('/product/:productId',getProduct);
//get user cart
// router.get('/product/cart/:userId',getProductInCartByUserId);

module.exports=router;