const express = require('express');
const app = express();
const testRouter = require('./routes/test');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fashionTest', {
    autoIndex: true
}).then(
    () => { console.log('DB IS UP AND RUNNING..'); }
).catch(
    () => { console.log('DB IS NOT RUNNING..'); }
)

app.use(bodyparser.json());
app.use('/', (req,res)=>{
    res.status(200).json({
        message:'this is root'
    })
    console.log("hi this log");
});

app.listen(1000, () => {
    console.log("SERVER IS UP AND RUNNING at 1000")
})