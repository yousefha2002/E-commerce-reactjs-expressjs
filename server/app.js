const express = require('express')
const app = express()
const parser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(parser.json())
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    if(req.method==="OPTIONS")
    {
        return res.sendStatus(200)
    }
    next();
})

const product = require('./routes/product')
app.use('/product',product)

const auth = require('./routes/auth')
app.use('/auth',auth)

const department = require('./routes/department')
app.use('/department',department)

const category = require('./routes/category')
app.use('/category',category)

const favourite = require('./routes/favourite')
app.use('/favourite',favourite)

const user = require('./routes/user')
app.use('/user',user)

const cart = require('./routes/cart')
app.use('/cart',cart)

const order = require('./routes/order')
app.use('/order',order)

app.use((error,req,res,next)=>
{
    console.log(error);
    const status = error.statusCode
    const message = error.message
    res.status(status).json({message:message})
})

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yousefha02:2838293yo@cluster0.t5dqa.mongodb.net/Shop?retryWrites=true&w=majority')
.then(result=>
    {
        app.listen(process.env.PORT || 8000)
        console.log('conntect')
    })
.catch(err=>
    {
        console.log(err)
    })