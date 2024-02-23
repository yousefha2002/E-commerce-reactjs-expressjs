const Category = require('../model/Category')
const Product = require('../model/product')

exports.createCategory = async(req,res,next)=>
{
    try{
        const {departmentId,title} = req.body
        const category = await Category.findOne({departmentId:departmentId,title:title})
        if(category)
        {
            const error = new Error('category is found')
            error.statusCode = 401
            throw error
        }
        const newCategory = new Category({departmentId,title})
        await newCategory.save()
        res.status(201).json({message:"category has created"})
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

exports.getCategories = async(req,res,next)=>
{
    try{
        let Categories ;
        if(!req.query.department)
        Categories = await Category.find().populate("departmentId")
        else
        Categories = await Category.find({departmentId:req.query.department}).populate("departmentId")
        res.status(200).json({Categories})
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