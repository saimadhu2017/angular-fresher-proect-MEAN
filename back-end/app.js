//Importing all the required things
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');
const app = express();

//DB Connection
mongoose.connect(process.env.DB_HOST, {
    autoIndex:true
}).then(
    ()=>{console.log('DB IS UP AND RUNNING..');}
).catch(
    ()=>{console.log('DB IS NOT RUNNING..');}
)

//Middlewares
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

//API's or Routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);

//Creating a server
app.listen(process.env.PORT, () => {
    console.log(`Server is Up and Running at port ${process.env.PORT}`);
})