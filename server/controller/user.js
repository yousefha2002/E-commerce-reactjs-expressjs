const User = require('../model/user.js')
const Order = require('../model/Order')
const Product = require('../model/product')

exports.getUser = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        if(userId!==req.userId)
        {
            const error = new Error('you can not get actions')
            error.statusCode = 401
            throw error
        }
        const user = await User.findById(userId).populate('favourites.productId').populate('cart.productId')
        if(!user)
        {
            const error = new Error('user not found')
            error.statusCode = 404
            throw error ; 
        }
        res.status(200).json({user})
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

exports.getUsers = async(req,res,next)=>
{
    try{
        const users = await User.find()
        res.status(200).json({users})
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

exports.getMainInfo = async(req,res,next)=>
{
    try{
        const orders = await Order.countDocuments()
        const products = await Product.countDocuments()
        const users = await User.countDocuments()
        res.status(200).json({orders,products,users})
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