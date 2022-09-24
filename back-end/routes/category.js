const express = require('express');
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers/category');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//create
router.post('/category/create/:userId', isSignedin, isAuthenticated, isAdmin, createCategory);

//read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

//update
router.put('/category/update/:userId/:categoryId', isSignedin, isAuthenticated, isAdmin, updateCategory);

//delete
router.delete('/category/delete/:userId/:categoryId', isSignedin, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;