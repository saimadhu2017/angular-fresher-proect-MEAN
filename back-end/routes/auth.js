const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedin } = require('../controllers/auth');

router.post('/signin', signin);

router.post('/signup', signup);

router.get('/signout', signout);

router.get('/test',isSignedin,(req,res)=>{
    res.json(req.auth)
});

module.exports = router;