const Product = require('../model/product')
const Category = require('../model/Category')
const fs = require('fs')
const path = require('path')

exports.createProduct = async(req,res,next)=>
{
    try{
        const {title,price,colors,sizes,categoryId} = req.body
        if(!req.file)
        {
            const error = new Error('image not found')
            error.statusCode = 422
            throw error
        }
        const product = new Product({title,price,colors:colors.split(","),sizes:sizes.split(","),categoryId,image:req.file.filename})
        await product.save()
        res.status(201).json({messgae:"product has created"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}

exports.getProducts = async(req,res,next)=>
{
    try{
        let products ;
        if(!req.query.category)
            products = await Product.find().populate("categoryId")
        else
            products = await Product.find({categoryId:req.query.category}).populate("categoryId")
        res.status(200).json({products})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    } 
}

exports.deleteProduct = async(req,res,next)=>
{
    try{
        const {productId} = req.params
        const product = await Product.findById(productId)
        if(!product)
        {
            const error = new Error('product not found')
            error.statusCode = 404
            throw error
        }
        await Product.findByIdAndRemove(productId)
        res.status(200).json({message:"product has deleted"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    } 
}

exports.editProduct = async(req,res,next)=>
{
    try{
        const {title,price,colors,sizes} = req.body
        const {id} = req.params
        const product = await Product.findById(id)
        product.title = title
        product.price = price
        product.colors = colors.split(",")
        product.sizes = sizes.split(",")
        if(req.file)
        {
            product.image = req.file.filename
        }
        await product.save()
        res.status(201).json({messgae:"product has updated"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }  
}

exports.getProduct = async(req,res,next)=>
{
    try{
        const product = await Product.findById(req.params.id)
        if(!product)
        {
            const error = new Error('product is not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({product})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getNewProducts = async(req,res,next)=>
{
    try{
        const products = await Product.find().sort({'createdAt':-1}).limit(7)
        res.status(200).json({products})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getProductsByDepartment = async(req,res,next)=>
{
    try{
        const {departmentId} = req.params
        const categories = await Category.find({departmentId:departmentId})
        let allProducts = [];
        for(const category of categories)
        {
            const products = await Product.find({categoryId:category._id}).populate('categoryId')
            allProducts.push(...products)
        }
        res.status(200).json({allProducts})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.addReviewToProduct = async(req,res,next)=>
{
    try{
        const {productId} = req.params
        const {comment,rating,date,userName} = req.body
        const product = await Product.findById(productId)
        if(!product)
        {
            const error = new Error('product is not found')
            error.statusCode = 404
            throw new error ; 
        }
        product.reviews.push({userName:userName,rating,comment,date,userId:req.userId})
        await product.save()
        res.status(201).json({message:"success review"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

const clearImage = (filePath)=>{
    filePath = path.join(__dirname,'..',`images/${filePath}`);
    fs.unlink(filePath,(err)=>{
        console.log(err);
    })
}